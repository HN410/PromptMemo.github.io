document.addEventListener("DOMContentLoaded", function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#data-table tbody');

            data.forEach(item => {
                const row = document.createElement('tr');

                const copyButtonCell = document.createElement('td');
                const copyButton = document.createElement('button');
                copyButton.innerText = 'Copy';
                copyButton.onclick = function() {
                    navigator.clipboard.writeText(item.content.replace(/<br>/g, '\n'));
                };
                copyButtonCell.appendChild(copyButton);
                row.appendChild(copyButtonCell);

                const nameCell = document.createElement('td');
                nameCell.textContent = item.name;
                row.appendChild(nameCell);

                const contentCell = document.createElement('td');
                contentCell.innerHTML = item.content;
                row.appendChild(contentCell);

                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
