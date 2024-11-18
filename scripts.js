document.addEventListener("DOMContentLoaded", function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#data-table tbody');

            data.forEach(item => {
                const row = document.createElement('tr');

                const copyButtonCell = document.createElement('td');
                if (Array.isArray(item.content)) { // contentの内容がリストのとき
                    item.content.forEach((content, index) => {
                        const copyButton = document.createElement('button');
                        copyButton.innerText = 'Copy ' + (index + 1);
                        copyButton.onclick = function() {
                            navigator.clipboard.writeText(content.replace(/<br>/g, '\n'));
                            // 一時的にボタンの色を変える
                            copyButton.style.backgroundColor = "pink";
                            // しばらくすると元に戻す
                            setTimeout(() => {
                                copyButton.style.backgroundColor = '';
                            }, 1000);
                        };
                        copyButtonCell.appendChild(copyButton);
                    });
                }else {
                    // contentの内容がリストじゃないとき
                    const copyButton = document.createElement('button');
                    copyButton.innerText = 'Copy';
                    copyButton.onclick = function() {
                        navigator.clipboard.writeText(item.content.replace(/<br>/g, '\n'));
                        // 一時的にボタンの色を変える
                        copyButton.style.backgroundColor = "pink";
                        // しばらくすると元に戻す
                        setTimeout(() => {
                            copyButton.style.backgroundColor = '';
                        }, 1000);

                    };
                    copyButtonCell.appendChild(copyButton);
                }
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
