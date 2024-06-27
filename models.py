from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_name = db.Column(db.String(120), nullable=False)
    rag_status = db.Column(db.String(1), nullable=False)
    impediments = db.Column(db.String(255), nullable=False)
    resource = db.Column(db.String(120), nullable=False)

    # def __repr__(self):
    #     return f"<Project {self.project_name}>"

    def __init__(self, project_name, rag_status, impediments, resource):
        self.project_name = project_name
        self.rag_status = rag_status
        self.impediments = impediments
        self.resource = resource

    def to_dict(self):
        return {
            'id': self.id,
            'project_name': self.project_name,
            'rag_status': self.rag_status,
            'impediments': self.impediments,
            'resource': self.resource
        }
