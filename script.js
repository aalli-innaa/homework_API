document.getElementById('searchButton').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');

    if (!query.trim()) {
        resultsDiv.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }

    resultsDiv.innerHTML = '<p>Searching...</p>';

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.items && data.items.length > 0) {
                resultsDiv.innerHTML = '';
                data.items.forEach(item => {
                    const book = item.volumeInfo;
                    const bookDiv = document.createElement('div');
                    bookDiv.className = 'book';
                    bookDiv.innerHTML = `
                        <div class="book-details">
                            <img src="${book.imageLinks?.thumbnail || 'https://via.placeholder.com/100'}" alt="${book.title}">
                            <div>
                                <h3>${book.title}</h3>
                                <p><strong>Authors:</strong> ${book.authors ? book.authors.join(', ') : 'N/A'}</p>
                                <p><strong>Published:</strong> ${book.publishedDate || 'N/A'}</p>
                                <p><a href="${book.infoLink}" target="_blank">More Info</a></p>
                            </div>
                        </div>
                    `;
                    resultsDiv.appendChild(bookDiv);
                });
            } else {
                resultsDiv.innerHTML = '<p>No results found.</p>';
            }
        })
        .catch(error => {
            resultsDiv.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        });
});
