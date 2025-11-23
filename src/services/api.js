// API service for MySQL backend
const API_BASE_URL = 'http://localhost:3001/api';

class ApiService {
    // Projects
    static async getProjects() {
        try {
            const response = await fetch(`${API_BASE_URL}/projects`);
            if (!response.ok) throw new Error('Failed to fetch projects');
            return await response.json();
        } catch (error) {
            console.error('Error fetching projects:', error);
            return [];
        }
    }

    // Certificates
    static async getCertificates() {
        try {
            const response = await fetch(`${API_BASE_URL}/certificates`);
            if (!response.ok) throw new Error('Failed to fetch certificates');
            return await response.json();
        } catch (error) {
            console.error('Error fetching certificates:', error);
            return [];
        }
    }

    // Admin endpoints (optional)
    static async addProject(projectData) {
        try {
            const formData = new FormData();
            formData.append('title', projectData.title);
            formData.append('description', projectData.description);
            formData.append('link', projectData.link);
            formData.append('techStack', JSON.stringify(projectData.techStack));
            
            if (projectData.image) {
                formData.append('image', projectData.image);
            }

            const response = await fetch(`${API_BASE_URL}/projects`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Failed to add project');
            return await response.json();
        } catch (error) {
            console.error('Error adding project:', error);
            throw error;
        }
    }

    static async addCertificate(certificateData) {
        try {
            const formData = new FormData();
            formData.append('title', certificateData.title);
            formData.append('description', certificateData.description);
            
            if (certificateData.image) {
                formData.append('image', certificateData.image);
            }

            const response = await fetch(`${API_BASE_URL}/certificates`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Failed to add certificate');
            return await response.json();
        } catch (error) {
            console.error('Error adding certificate:', error);
            throw error;
        }
    }

    // Events
    static async getEvents() {
        try {
            const response = await fetch(`${API_BASE_URL}/events`);
            if (!response.ok) throw new Error('Failed to fetch events');
            return await response.json();
        } catch (error) {
            console.error('Error fetching events:', error);
            return [];
        }
    }

    static async addEvent(eventData) {
        try {
            const formData = new FormData();
            formData.append('title', eventData.title);
            formData.append('description', eventData.description);
            formData.append('caption', eventData.caption || '');
            formData.append('date', eventData.date);
            formData.append('location', eventData.location);
            
            if (eventData.image) {
                formData.append('image', eventData.image);
            }

            const response = await fetch(`${API_BASE_URL}/events`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error('Failed to add event');
            return await response.json();
        } catch (error) {
            console.error('Error adding event:', error);
            throw error;
        }
    }
}

export default ApiService;
