export class Tombol {
    buat(label, f) {
        let button = document.createElement('button');
        button.classList.add("btn");
        button.classList.add("btn-primary");
        button.style.display = 'block';
        button.style.margin = 'auto';
        button.style.marginBottom = '8px';
        button.textContent = label;
        button.onclick = (e) => {
            e.stopPropagation();
            f();
        };
        return button;
    }
}
