// Authentication functions
function authenticateUser(username, password, role) {
    const users = getUsers();

    // Find user by username and password
    const user = users.find(user =>
        user.username === username &&
        user.password === password
    );

    if (!user) {
        return null;
    }

    // Check if account is active
    if (user.status !== 'active') {
        alert(`Account is ${user.status}. Please contact administrator.`);
        return null;
    }

    // Check role requirements
    if (role === 'warden') {
        // For warden login, accept warden or staff
        if (user.role === 'warden' || user.role === 'staff') {
            return user;
        }
    } else if (role === 'student') {
        // For student login, accept student only
        if (user.role === 'student') {
            return user;
        }
    }

    return null;
}

function checkAuth() {
    const userData = sessionStorage.getItem('currentUser');
    if (!userData) {
        window.location.href = 'index.html';
        return null;
    }

    const user = JSON.parse(userData);

    // Check if user account is still active
    const users = getUsers();
    const currentUser = users.find(u => u.id === user.id);

    if (!currentUser || currentUser.status !== 'active') {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'index.html';
        return null;
    }

    return user;
}

function requireAuth(requiredRole) {
    const userData = sessionStorage.getItem('currentUser');
    if (!userData) {
        window.location.href = 'index.html';
        return null;
    }

    const user = JSON.parse(userData);

    // Check if user account is still active
    const users = getUsers();
    const currentUser = users.find(u => u.id === user.id);

    if (!currentUser || currentUser.status !== 'active') {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'index.html';
        return null;
    }

    // Check role permissions
    if (requiredRole) {
        if (requiredRole === 'warden' && user.role !== 'warden') {
            window.location.href = user.role === 'student' ? 'student-dashboard.html' : 'warden-dashboard.html';
            return null;
        }
        if (requiredRole === 'staff' && user.role !== 'staff') {
            window.location.href = user.role === 'student' ? 'student-dashboard.html' : 'warden-dashboard.html';
            return null;
        }
        if (requiredRole === 'student' && user.role !== 'student') {
            window.location.href = 'warden-dashboard.html';
            return null;
        }
    }

    return user;
}

function logout() {
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Check if user is authenticated on page load
function checkAuthOnLoad(requiredRole = null) {
    const userData = sessionStorage.getItem('currentUser');
    if (!userData) {
        window.location.href = 'index.html';
        return null;
    }

    const user = JSON.parse(userData);

    // Check if user account is still active
    const users = getUsers();
    const currentUser = users.find(u => u.id === user.id);

    if (!currentUser || currentUser.status !== 'active') {
        sessionStorage.removeItem('currentUser');
        window.location.href = 'index.html';
        return null;
    }

    if (requiredRole) {
        if (requiredRole === 'warden' && user.role !== 'warden') {
            window.location.href = user.role === 'student' ? 'student-dashboard.html' : 'warden-dashboard.html';
            return null;
        }
        if (requiredRole === 'staff' && user.role !== 'staff') {
            window.location.href = user.role === 'student' ? 'student-dashboard.html' : 'warden-dashboard.html';
            return null;
        }
        if (requiredRole === 'student' && user.role !== 'student') {
            window.location.href = 'warden-dashboard.html';
            return null;
        }
    }

    return user;
}