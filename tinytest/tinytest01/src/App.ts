declare var tinymce:any;

class App {
	private startTbl:HTMLButtonElement;

	private tab0:HTMLDivElement;
	private tab1:HTMLDivElement;

	private tab0btn:HTMLButtonElement;
	private tab1btn:HTMLButtonElement;
	
	constructor() {
		tinymce.init({ selector: 'textarea.tiny1' });

		this.tab0btn = document.body.querySelector('div.tab-holder button.tab0');
		this.tab1btn = document.body.querySelector('div.tab-holder button.tab1');

		this.startTbl = document.body.querySelector('button.start');
		this.tab0 = document.body.querySelector('div.tab0');
		this.tab1 = document.body.querySelector('div.tab1');

		this.tab0btn.onclick = () => {
			this.tab1.style.display='none';
			this.tab0.style.display='block';
			this.tab0.focus();
			this.tab0btn.classList.add('active');
			this.tab1btn.classList.remove('active');
		}

		this.tab1btn.onclick = () => {
			this.tab0.style.display='none';
			this.tab1.style.display='block';
			this.tab1.focus();
			this.tab0btn.classList.remove('active');
			this.tab1btn.classList.add('active');
		}

		this.startTbl.onclick = () => {
			setTimeout(() => {
				this.tab1.style.display='none';
				this.tab0.style.display='block';
				this.tab0.focus();
				this.tab0btn.classList.add('active');
				this.tab1btn.classList.remove('active');

				console.log(tinymce);
				console.log(tinymce.EditorMode);
	
			}, 3000);
		}

		console.log(this.tab0 + '/' + this.tab1 + '/' + this.startTbl);
	}
}

window.onload = () => {
	console.log('window onload');
	new App();
}