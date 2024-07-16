import pandas as pd
from flask import Blueprint, jsonify, request
from sqlalchemy import String, or_
from sqlalchemy.exc import SQLAlchemyError

from models import Project, db  # Import here at the top level

proutes = Blueprint('proutes', __name__)

def get_model_class(model_name):
    if model_name == 'project':
        return Project
    # elif model_name == 'accelerator':
    #     return Accelerator
    else:
        return None

@proutes.route('/api/get_<model_name>s', methods=['GET'])
def get_projects(model_name):
    model_class = get_model_class(model_name)
    if not model_class:
        return jsonify({'error': 'Invalid model'}), 400

    rag_status = request.args.get('rag_status', 'all')
    search_query = request.args.get('search', '')
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 5))
 
    query = model_class.query

    # Filter by RAG status if specified
    if rag_status != 'all' and hasattr(model_class, 'rag_status'):
        query = query.filter_by(rag_status=rag_status)

    # Dynamic search filter
    if search_query:
        search_pattern = f"%{search_query}%"
        search_filter = []
        for attr in model_class.__table__.columns:
            if isinstance(attr.type, String):  # Only consider string attributes
                search_filter.append(attr.ilike(search_pattern))
        if search_filter:
            query = query.filter(or_(*search_filter))

    total_projects = query.count()
    projects = query.paginate(page=page, per_page=per_page, error_out=False).items

    return jsonify({
        f'{model_name}s': [project.to_dict() for project in projects],
        'total': total_projects,
        'page': page,
        'per_page': per_page
    })

@proutes.route('/api/upload_<model_name>s', methods=['POST'])
def upload_projects(model_name):
    model_class = get_model_class(model_name)
    if not model_class:
        return jsonify({'error': 'Invalid model'}), 400
    if 'file' not in request.files:
        return jsonify({"message": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"message": "No selected file"}), 400

    try:
        if file.filename and file.filename.endswith('.csv'):
            df = pd.read_csv(file)
        elif file.filename and file.filename.endswith('.xlsx'):
            df = pd.read_excel(file)
        else:
            return jsonify({"message": "Unsupported file type"}), 400

        # Dynamically get model class attributes, excluding 'id'
        model_attributes = [column.name for column in model_class.__table__.columns]
        for index, row in df.iterrows():
            new_project = model_class()
            for col in row.index:
                if col in model_attributes and isinstance(col, str):# Only if col is a string 
                    setattr(new_project, col, row[col])
            db.session.add(new_project)
        db.session.commit()
        return jsonify({"message": f"{model_name.capitalize()}s uploaded successfully!"}), 200
    except Exception as e:
        return jsonify({"message": "Error processing file", "error": str(e)}), 400



@proutes.route('/api/add_<model_name>', methods=['POST'])
def add_project(model_name):
    model_class = get_model_class(model_name)
    if not model_class:
        return jsonify({'error': 'Invalid model'}), 400

    data = request.get_json()
    print("Incoming Data:", data)  # Debug print

    # Filter out only the attributes that exist in the model class
    filtered_data = {attr: data[attr] for attr in data if hasattr(model_class, attr)}
    print("Filtered Data:", filtered_data)  # Debug print

    try:
        # Create a new instance of the model class using keyword arguments
        new_project = model_class(**filtered_data)
        db.session.add(new_project)
        db.session.commit()
        return jsonify({'message': f'{model_name.capitalize()} added successfully'}), 201
    except TypeError as e:
        return jsonify({'error': 'Invalid attribute', 'message': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Failed to add project', 'message': str(e)}), 500



@proutes.route('/api/delete_<model_name>', methods=['POST'])
def delete_project(model_name):
    model_class = get_model_class(model_name)
    if not model_class:
        return jsonify({'error': 'Invalid model'}), 400
    data = request.get_json()
    project_id = data[f'{model_name}_id']
    project = Project.query.get(project_id)
    if project:
        db.session.delete(project)
        db.session.commit()
        return jsonify({'message': f'{model_name.capitalize()} deleted successfully'}),\
        200
    else:
        return jsonify({'message': f'{model_name.capitalize()} not found'}), 404


@proutes.route('/api/get_<model_name>_counts', methods=['GET'])
def get_project_counts(model_name):
    model_class = get_model_class(model_name)
    if not model_class:
        return jsonify({'error': 'Invalid model'}), 400

    # Dynamically determine the attribute names for RAG status
    if not hasattr(model_class, 'rag_status'):
        return jsonify({'error': f'Model {model_name} does not have a '
             'rag_status attribute'}), 400

    # Get the rag_status attribute name
    rag_status_attr = 'rag_status'

    rag_status = request.args.get('rag_status', 'all')

    # Dynamically build the filters
    try:
        status_filters = {
            'R': model_class.query.filter(getattr(model_class, rag_status_attr) == 'R').count(),
            'A': model_class.query.filter(getattr(model_class, rag_status_attr) == 'A').count(),
            'G': model_class.query.filter(getattr(model_class, rag_status_attr) == 'G').count(),
        }
    except Exception as e:
        return jsonify({'error': 'Error querying model', 'message': str(e)}), 500

    if rag_status == 'all':
        counts = status_filters
    elif rag_status in status_filters:
        counts = {rag_status: status_filters[rag_status]}
    else:
        return jsonify({'error': 'Invalid rag_status parameter'}), 400

    return jsonify(counts)



@proutes.route('/api/get_<model_name>/<int:project_id>', methods=['GET'])
def get_project(model_name, project_id):
    model_class = get_model_class(model_name)
    if not model_class:
        return jsonify({'error': 'Invalid model'}), 400
    project = model_class.query.get(project_id)
    if project:
        return jsonify(project.to_dict())
    else:
        return jsonify({'message': f'{model_name.capitalize()} not found'}), 404



@proutes.route('/api/edit_<model_name>/<int:project_id>', methods=['POST'])
def edit_project(model_name, project_id):
    model_class = get_model_class(model_name)
    if not model_class:
        return jsonify({'error': 'Invalid model'}), 400

    data = request.get_json()
    project = model_class.query.get(project_id)
    if project:
        try:
            for attr, value in data.items():
                if hasattr(project, attr):
                    setattr(project, attr, value)
            db.session.commit()
            return jsonify({'message': f'{model_name.capitalize()} updated successfully'}
                          ), 200
        except SQLAlchemyError as e:
            db.session.rollback()
            return jsonify({'message': 'Error updating project', 'error': str(e)}), 400
    else:
        return jsonify({'message': f'{model_name.capitalize()} not found'}), 404

@proutes.route('/api/projects', methods=['GET'])
def projects():
    model_name = 'project'  # Specify the model name
    model_class = get_model_class(model_name)
    if not model_class:
        return jsonify({'error': 'Invalid model'}), 400

    # rag_status = request.args.get('rag_status', 'all')
    # search_query = request.args.get('search', '')

    query = model_class.query

    # # Filter by RAG status if specified
    # if rag_status != 'all' and hasattr(model_class, 'rag_status'):
    #     query = query.filter_by(rag_status=rag_status)

    # # Dynamic search filter
    # if search_query:
    #     search_pattern = f"%{search_query}%"
    #     search_filter = []
    #     for attr in model_class.__table__.columns:
    #         if isinstance(attr.type, String):  # Only consider string attributes
    #             search_filter.append(attr.ilike(search_pattern))
    #     if search_filter:
    #         query = query.filter(or_(*search_filter))

    projects = query.all()  # Fetch all records

    return jsonify({
        'projects': [project.to_dict() for project in projects],  
        'total': len(projects),
    })

@proutes.route('/api/get_resources_by_rag_status', methods=['GET'])
def get_resources_by_rag_status():
    model_name = 'project'  # Specify the model name
    model_class = get_model_class(model_name)
    if not model_class:
        return jsonify({'error': 'Invalid model'}), 400

    rag_status = request.args.get('rag_status')
    if not rag_status or rag_status not in ['R', 'G', 'A']:
        return jsonify({'error': 'Invalid or missing rag_status parameter'}), 400

    query = model_class.query.filter_by(rag_status=rag_status)

    projects = query.all()  # Fetch all records

    resources = [{'name': project.project_name, 'resource': project.resource} for project in projects]

    return jsonify({
        'resources': resources,
        'total': len(resources),
    })
