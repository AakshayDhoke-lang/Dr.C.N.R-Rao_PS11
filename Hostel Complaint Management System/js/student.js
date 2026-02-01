// Student-specific functions
function loadStudentDashboard() {
    const currentUser = getCurrentUser();
    const complaints = getComplaintsByStudent(currentUser.id);

    // Update counts
    document.getElementById('total-complaints').textContent = complaints.length;
    document.getElementById('pending-complaints').textContent = complaints.filter(c => c.status === 'Submitted').length;
    document.getElementById('inprogress-complaints').textContent = complaints.filter(c => ['Assigned', 'In Progress'].includes(c.status)).length;
    document.getElementById('resolved-complaints').textContent = complaints.filter(c => ['Resolved', 'Closed'].includes(c.status)).length;

    // Load recent complaints
    const recentComplaints = complaints
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    const tbody = document.getElementById('recent-complaints-body');
    tbody.innerHTML = '';

    if (recentComplaints.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="text-center">
                    <p>No complaints submitted yet</p>
                    <a href="new-complaint.html" class="btn btn-primary mt-2">Submit Your First Complaint</a>
                </td>
            </tr>
        `;
        return;
    }

    recentComplaints.forEach(complaint => {
                const row = document.createElement('tr');
                row.innerHTML = `
            <td>${complaint.id}</td>
            <td>${complaint.category}</td>
            <td>${complaint.description.substring(0, 40)}${complaint.description.length > 40 ? '...' : ''}</td>
            <td><span class="priority-badge priority-${complaint.priority.toLowerCase()}">${complaint.priority}</span></td>
            <td><span class="status-badge status-${complaint.status.toLowerCase().replace(' ', '-')}">${complaint.status}</span></td>
            <td>${new Date(complaint.createdAt).toLocaleDateString()}</td>
            <td>
                <a href="complaint-details.html?id=${complaint.id}" class="btn btn-small btn-primary">
                    <i class="fas fa-eye"></i>
                </a>
                ${complaint.status === 'Resolved' && !complaint.feedback ? `
                <button class="btn btn-small btn-success" onclick="provideFeedback(${complaint.id})">
                    <i class="fas fa-star"></i>
                </button>
                ` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
}

function provideFeedback(complaintId) {
    const rating = prompt('Please rate the resolution (1-5 stars):');
    if (rating && rating >= 1 && rating <= 5) {
        const comments = prompt('Any comments about the resolution:');
        updateComplaint(complaintId, {
            feedback: {
                rating: parseInt(rating),
                comments: comments || '',
                submittedAt: new Date().toISOString()
            }
        });
        alert('Thank you for your feedback!');
        loadStudentDashboard();
    }
}

function updateMessageNotification() {
    const currentUser = getCurrentUser();
    const unreadCount = getUnreadCount(currentUser.id);
    const badge = document.getElementById('message-notification');
    
    if (unreadCount > 0) {
        badge.textContent = unreadCount;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

// Initialize student dashboard
function initStudentDashboard() {
    const currentUser = checkAuthOnLoad('student');
    if (!currentUser) return;
    
    document.getElementById('current-user-name').textContent = currentUser.name;
    loadStudentDashboard();
    updateMessageNotification();
    
    // Logout button
    document.getElementById('logout-btn').addEventListener('click', logout);
    
    // Auto-refresh every 30 seconds
    setInterval(() => {
        loadStudentDashboard();
        updateMessageNotification();
    }, 30000);
}