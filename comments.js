// Initialize global variables
let currentPage = 1;
const commentsPerPage = 5;
const commentsKey = 'commentsDB'; // Key for storing comments in localStorage

// Function to retrieve comments from localStorage
function getComments() {
    const comments = localStorage.getItem(commentsKey);
    return comments ? JSON.parse(comments) : [];
}

// Function to save comments to localStorage
function saveComments(comments) {
    localStorage.setItem(commentsKey, JSON.stringify(comments));
}

// Function to render comments on the page
function renderComments() {
    const comments = getComments();
    const start = (currentPage - 1) * commentsPerPage;
    const end = start + commentsPerPage;

    const paginatedComments = comments.slice(start, end);
    const commentsContainer = document.getElementById('comments');
    commentsContainer.innerHTML = '';

    paginatedComments.forEach((comment, index) => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment-item', 'mb-3', 'p-3', 'border', 'rounded-4');
        commentElement.innerHTML = `
            <strong>${comment.name}</strong> <span class="text-muted">(${comment.presence})</span>
            <p>${comment.text}</p>
        `;
        commentsContainer.appendChild(commentElement);
    });

    document.getElementById('page').textContent = currentPage;

    // Enable/Disable pagination buttons
    document.getElementById('previous').classList.toggle('disabled', currentPage === 1);
    document.getElementById('next').classList.toggle('disabled', end >= comments.length);
}

// Function to handle the sending of a comment
function sendComment() {
    const name = document.getElementById('form-name').value;
    const presence = document.getElementById('form-presence').value;
    const text = document.getElementById('form-comment').value;

    if (!name || !text || presence === '0') {
        alert('Please fill in all fields!');
        return;
    }

    // Create new comment object
    const newComment = {
        name: name,
        presence: presence === '1' ? 'Datang' : 'Berhalangan',
        text: text,
    };

    // Get existing comments, add new one, and save
    const comments = getComments();
    comments.push(newComment);
    saveComments(comments);

    // Clear the form
    document.getElementById('form-name').value = '';
    document.getElementById('form-comment').value = '';
    document.getElementById('form-presence').value = '0';

    // Re-render comments
    renderComments();
}

// Pagination functions
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        renderComments();
    }
}

function nextPage() {
    const comments = getComments();
    const totalPages = Math.ceil(comments.length / commentsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderComments();
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderComments();
});
