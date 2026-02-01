// Database initialization and operations
function initDatabase() {
    // Initialize users if not exists
    if (!localStorage.getItem('hostel_users')) {
        const users = [
            { id: 1, username: 'john', password: '123', name: 'John Doe', role: 'student', room: '205B', email: 'john@hostel.edu' },
            { id: 2, username: 'admin', password: '123', name: 'Admin User', role: 'warden', email: 'admin@hostel.edu' },
            { id: 3, username: 'staff', password: '123', name: 'Maintenance Staff', role: 'staff', email: 'staff@hostel.edu' },
            { id: 4, username: 'jane', password: '123', name: 'Jane Smith', role: 'student', room: '108A', email: 'jane@hostel.edu' }
        ];
        localStorage.setItem('hostel_users', JSON.stringify(users));
    }

    // Initialize complaints if not exists
    if (!localStorage.getItem('hostel_complaints')) {
        const complaints = [{
                id: 1001,
                studentId: 1,
                studentName: 'John Doe',
                category: 'Plumbing',
                description: 'Leaking faucet in the bathroom',
                priority: 'Medium',
                status: 'Resolved',
                location: 'Room 205, Block B',
                assignedTo: 3,
                assignedName: 'Maintenance Staff',
                createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                resolvedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                feedback: { rating: 4, comments: 'Fixed quickly, good service.' }
            },
            {
                id: 1002,
                studentId: 1,
                studentName: 'John Doe',
                category: 'Electricity',
                description: 'Power socket not working',
                priority: 'High',
                status: 'In Progress',
                location: 'Room 205, Block B',
                assignedTo: 3,
                assignedName: 'Maintenance Staff',
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 1003,
                studentId: 1,
                studentName: 'John Doe',
                category: 'Cleanliness',
                description: 'Garbage not collected from corridor',
                priority: 'Low',
                status: 'Submitted',
                location: '3rd Floor Corridor, Block B',
                assignedTo: null,
                createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: 1004,
                studentId: 4,
                studentName: 'Jane Smith',
                category: 'Internet',
                description: 'WiFi connection unstable',
                priority: 'High',
                status: 'Assigned',
                location: 'Room 108, Block A',
                assignedTo: 3,
                assignedName: 'Maintenance Staff',
                createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];
        localStorage.setItem('hostel_complaints', JSON.stringify(complaints));
    }

    // Initialize messages if not exists
    if (!localStorage.getItem('hostel_messages')) {
        const messages = [{
                id: 1,
                complaintId: 1002,
                senderId: 1,
                senderName: 'John Doe',
                senderRole: 'student',
                receiverId: 3,
                receiverName: 'Maintenance Staff',
                message: 'Hi, any update on the power socket repair?',
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                status: 'read'
            },
            {
                id: 2,
                complaintId: 1002,
                senderId: 3,
                senderName: 'Maintenance Staff',
                senderRole: 'staff',
                receiverId: 1,
                receiverName: 'John Doe',
                message: 'We have ordered the replacement part. It should arrive tomorrow.',
                timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
                status: 'read'
            },
            {
                id: 3,
                complaintId: 1002,
                senderId: 1,
                senderName: 'John Doe',
                senderRole: 'student',
                receiverId: 3,
                receiverName: 'Maintenance Staff',
                message: 'Thank you for the update!',
                timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
                status: 'unread'
            },
            {
                id: 4,
                complaintId: 1004,
                senderId: 4,
                senderName: 'Jane Smith',
                senderRole: 'student',
                receiverId: 3,
                receiverName: 'Maintenance Staff',
                message: 'When can I expect the WiFi to be fixed?',
                timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
                status: 'unread'
            }
        ];
        localStorage.setItem('hostel_messages', JSON.stringify(messages));
    }

    // Initialize analytics data if not exists
    if (!localStorage.getItem('hostel_analytics')) {
        const analytics = {
            resolutionTimes: [2, 5, 1, 3, 4, 2, 6],
            dailyComplaints: [3, 5, 2, 4, 6, 3, 4],
            categoryStats: {
                'Plumbing': 15,
                'Electricity': 12,
                'Cleanliness': 8,
                'Internet': 10,
                'Room Issues': 6,
                'Furniture': 4,
                'Other': 3
            }
        };
        localStorage.setItem('hostel_analytics', JSON.stringify(analytics));
    }
}

// User operations
function getUsers() {
    return JSON.parse(localStorage.getItem('hostel_users')) || [];
}

function getUserById(id) {
    const users = getUsers();
    return users.find(user => user.id === id);
}

function getStaffMembers() {
    const users = getUsers();
    return users.filter(user => user.role === 'staff' || user.role === 'warden');
}

// Add these functions to database.js

// User operations continued...
function addUser(user) {
    try {
        const users = getUsers();

        // Check if username already exists
        if (users.some(u => u.username === user.username)) {
            console.log('Username already exists:', user.username);
            return false;
        }

        // Check if email already exists (if email provided)
        if (user.email && users.some(u => u.email && u.email === user.email)) {
            console.log('Email already exists:', user.email);
            return false;
        }

        // Generate ID if not provided
        if (!user.id) {
            user.id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        }

        // Set default values
        if (!user.createdAt) {
            user.createdAt = new Date().toISOString();
        }

        if (!user.status) {
            user.status = 'active';
        }

        // Add user to array
        users.push(user);

        // Save to localStorage
        localStorage.setItem('hostel_users', JSON.stringify(users));

        console.log('User added successfully:', user.username);
        return true;
    } catch (error) {
        console.error('Error adding user:', error);
        return false;
    }
}

function updateUser(userId, updates) {
    const users = getUsers();
    const index = users.findIndex(u => u.id === userId);

    if (index !== -1) {
        users[index] = {...users[index], ...updates };
        localStorage.setItem('hostel_users', JSON.stringify(users));
        return true;
    }
    return false;
}

function deleteUser(userId) {
    const users = getUsers();
    const filteredUsers = users.filter(u => u.id !== userId);

    if (filteredUsers.length < users.length) {
        localStorage.setItem('hostel_users', JSON.stringify(filteredUsers));

        // Also remove any complaints assigned to this user
        const complaints = getComplaints();
        const updatedComplaints = complaints.map(c => {
            if (c.assignedTo === userId) {
                return {...c, assignedTo: null, assignedName: null };
            }
            return c;
        });
        localStorage.setItem('hostel_complaints', JSON.stringify(updatedComplaints));

        return true;
    }
    return false;
}

function getUserByUsername(username) {
    const users = getUsers();
    return users.find(user => user.username === username);
}

function getUsersByRole(role) {
    const users = getUsers();
    return users.filter(user => user.role === role);
}

function getPendingStaffAccounts() {
    const users = getUsers();
    return users.filter(user => user.role === 'staff_pending');
}

function approveStaffAccount(userId) {
    return updateUser(userId, { role: 'staff' });
}

// Update initDatabase to include more sample users
// In the existing initDatabase function, update the users array to include:
const users = [
    { id: 1, username: 'john', password: '123', name: 'John Doe', role: 'student', room: '205B', email: 'john@hostel.edu' },
    { id: 2, username: 'admin', password: '123', name: 'Admin User', role: 'warden', email: 'admin@hostel.edu' },
    { id: 3, username: 'staff', password: '123', name: 'Maintenance Staff', role: 'staff', email: 'staff@hostel.edu' },
    { id: 4, username: 'jane', password: '123', name: 'Jane Smith', role: 'student', room: '108A', email: 'jane@hostel.edu' },
    { id: 5, username: 'alex', password: '123', name: 'Alex Johnson', role: 'student', room: '312C', email: 'alex@hostel.edu' },
    { id: 6, username: 'sarah', password: '123', name: 'Sarah Miller', role: 'student', room: '204D', email: 'sarah@hostel.edu' }
];

// Complaint operations
function getComplaints() {
    return JSON.parse(localStorage.getItem('hostel_complaints')) || [];
}

function getComplaintById(id) {
    const complaints = getComplaints();
    return complaints.find(complaint => complaint.id === id);
}

function getComplaintsByStudent(studentId) {
    const complaints = getComplaints();
    return complaints.filter(complaint => complaint.studentId === studentId);
}

function getComplaintsByStaff(staffId) {
    const complaints = getComplaints();
    return complaints.filter(complaint => complaint.assignedTo === staffId);
}

function saveComplaints(complaints) {
    localStorage.setItem('hostel_complaints', JSON.stringify(complaints));
}

function addComplaint(complaint) {
    const complaints = getComplaints();
    const newId = complaints.length > 0 ? Math.max(...complaints.map(c => c.id)) + 1 : 1001;

    complaint.id = newId;
    complaint.createdAt = new Date().toISOString();
    complaint.updatedAt = new Date().toISOString();

    complaints.push(complaint);
    saveComplaints(complaints);

    // Create a notification message for warden
    const warden = getUsers().find(u => u.role === 'warden');
    if (warden) {
        addMessage({
            complaintId: complaint.id,
            senderId: complaint.studentId,
            senderName: complaint.studentName,
            senderRole: 'student',
            receiverId: warden.id,
            receiverName: warden.name,
            message: `New complaint submitted: ${complaint.category} - ${complaint.description.substring(0, 50)}...`,
            isNotification: true
        });
    }

    return complaint;
}

function updateComplaint(id, updates) {
    const complaints = getComplaints();
    const index = complaints.findIndex(c => c.id === id);

    if (index !== -1) {
        complaints[index] = {...complaints[index], ...updates, updatedAt: new Date().toISOString() };

        // If status changed to resolved/closed, update resolvedAt
        if ((updates.status === 'Resolved' || updates.status === 'Closed') && !complaints[index].resolvedAt) {
            complaints[index].resolvedAt = new Date().toISOString();
        }

        saveComplaints(complaints);
        return true;
    }
    return false;
}

// Message operations
function getMessages() {
    return JSON.parse(localStorage.getItem('hostel_messages')) || [];
}

function getMessagesByComplaint(complaintId) {
    const messages = getMessages();
    return messages.filter(message => message.complaintId === complaintId);
}

function getMessagesByUser(userId) {
    const messages = getMessages();
    return messages.filter(message => message.senderId === userId || message.receiverId === userId);
}

function getUnreadCount(userId) {
    const messages = getMessages();
    return messages.filter(message => message.receiverId === userId && message.status === 'unread').length;
}

function markMessagesAsRead(complaintId, userId) {
    const messages = getMessages();
    messages.forEach(message => {
        if (message.complaintId === complaintId && message.receiverId === userId && message.status === 'unread') {
            message.status = 'read';
        }
    });
    localStorage.setItem('hostel_messages', JSON.stringify(messages));
}

function addMessage(messageData) {
    const messages = getMessages();
    const newId = messages.length > 0 ? Math.max(...messages.map(m => m.id)) + 1 : 1;

    const message = {
        id: newId,
        complaintId: messageData.complaintId,
        senderId: messageData.senderId,
        senderName: messageData.senderName,
        senderRole: messageData.senderRole,
        receiverId: messageData.receiverId,
        receiverName: messageData.receiverName,
        message: messageData.message,
        timestamp: new Date().toISOString(),
        status: 'unread',
        isNotification: messageData.isNotification || false
    };

    messages.push(message);
    localStorage.setItem('hostel_messages', JSON.stringify(messages));

    return message;
}

// Analytics operations
function getAnalytics() {
    return JSON.parse(localStorage.getItem('hostel_analytics')) || {};
}

// Helper function to get current user from session
function getCurrentUser() {
    const userData = sessionStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}