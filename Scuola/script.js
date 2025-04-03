document.querySelector('form').addEventListener('submit', function(e) {
    const inputs = document.querySelectorAll('input, select');
    for (let input of inputs) {
        if (input.value.trim() === '') {
            e.preventDefault();
            alert("Compilare tutti i campi!");
            return;
        }
    }
});
