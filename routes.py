import pandas as pd
from flask import Blueprint, jsonify, request
from sqlalchemy import or_

from models import Project, db

routes = Blueprint('routes', __name__)

@routes.route('/api/get_projects', methods=['GET'])
def get_projects():
    rag_status = request.args.get('rag_status', 'all')
    search_query = request.args.get('search', '')
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 5))

    query = Project.query

    if rag_status != 'all':
        query = query.filter_by(rag_status=rag_status)

    if search_query:
        search_pattern = f"%{search_query}%"
        query = query.filter(
            or_(Project.project_name.ilike(search_pattern),
                Project.impediments.ilike(search_pattern),
                Project.resource.ilike(search_pattern)))

    total_projects = query.count()
    projects = query.paginate(page=page, per_page=per_page, error_out=False).items

    return jsonify({
        'projects': [project.to_dict() for project in projects],
        'total': total_projects,
        'page': page,
        'per_page': per_page
    })


@routes.route('/api/upload_projects', methods=['POST'])
def upload_projects():
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

        for index, row in df.iterrows():
            new_project = Project(
                project_name=row['Project'],
                rag_status=row['RAG Status'],
                impediments=row['Impediments'],
                resource=row['Resource']
            )
            db.session.add(new_project)
        db.session.commit()
        return jsonify({"message": "Projects uploaded successfully!"}), 200
    except Exception as e:
        return jsonify({"message": "Error processing file", "error": str(e)}), 400


@routes.route('/api/add_project', methods=['POST'])
def add_project():
    data = request.get_json()
    new_project = Project(project_name=data['project'],
                          rag_status=data['status'],
                          impediments=data.get('impediments', ''),
                          resource=data['resource'])
    db.session.add(new_project)
    db.session.commit()
    return jsonify({'message': 'Project added successfully'}), 201


@routes.route('/api/delete_project', methods=['POST'])
def delete_project():
    data = request.get_json()
    project_id = data['project_id']
    project = Project.query.get(project_id)
    if project:
        db.session.delete(project)
        db.session.commit()
        return jsonify({'message': 'Project deleted successfully'}), 200
    else:
        return jsonify({'message': 'Project not found'}), 404


@routes.route('/api/get_project_counts', methods=['GET'])
def get_project_counts():
    rag_status = request.args.get('rag_status', 'all')
    status_filters = {
        'R': Project.query.filter_by(rag_status='R').count(),
        'A': Project.query.filter_by(rag_status='A').count(),
        'G': Project.query.filter_by(rag_status='G').count(),
    }
    if rag_status == 'all':
        counts = status_filters
    elif rag_status in status_filters:
        counts = {rag_status: status_filters[rag_status]}
    else:
        return jsonify({'error': 'Invalid rag_status parameter'}), 400
    return jsonify(counts)


@routes.route('/api/get_project/<int:project_id>', methods=['GET'])
def get_project(project_id):
    project = Project.query.get(project_id)
    if project:
        return jsonify(project.to_dict())
    else:
        return jsonify({'message': 'Project not found'}), 404


@routes.route('/api/edit_project/<int:project_id>', methods=['POST'])
def edit_project(project_id):
    data = request.get_json()
    project = Project.query.get(project_id)
    if project:
        project.project_name = data['project_name']
        project.rag_status = data['rag_status']
        project.impediments = data.get('impediments', '')
        project.resource = data['resource']
        db.session.commit()
        return jsonify({'message': 'Project updated successfully'}), 200
    else:
        return jsonify({'message': 'Project not found'}), 404
