// following - https://www.youtube.com/watch?v=PCWaFLy3VUo&t=1501s
const styles = `
    <style>
        .card {
            font-family: 'Arial', sans-serif;
            background: #f4f4f4;
            width: 500px;
            display: grid;
            grid-template-columns: 1fr 2fr;
            grid-gap: 10px;
            margin-bottom: 10px;
            border-bottom: 5px solid orange;
        }

        .card .avatar {
            width: 100%;
        }

        .card button {
            cursor: pointer;
            background: orange;
            color: #fff;
            border: none;
            padding: .4rem .75rem;
        }
    </style>
`;

const template = document.createElement("template");
template.innerHTML = `
    ${styles}
    <div class="card">
        <img class="avatar" /> 
        <div>
            <h3 class="name"></h3>
            <div class="body">
                <p><slot name="email" /></p>
                <p><slot name="phone" /></p>
            </div>
            <button id="toggle-info">hide info</button>
        </div>
    </div>
`;

class UserCard extends HTMLElement {
    constructor() {
        super();
        this.showInfo = true;

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.queryForElement(".name").innerText = this.getAttribute("name");
        this.queryForElement("img").src = this.getAttribute("avatar");
    }

    queryForElement(query) {
        const elem = this.shadowRoot.querySelector(query);

        if (!elem) {
            throw new Error(`Could not query element by ${query}`);
        }

        return elem;
    }

    toggleBody() {
        this.showInfo = !this.showInfo;

        const body = this.queryForElement(".body");
        const toggleBtn = this.queryForElement("#toggle-info");

        if (this.showInfo) {
            body.style.display = "block";
            toggleBtn.innerText = "Hide Info";
        } else {
            body.style.display = "none";
            toggleBtn.innerText = "Show Info";
        }
    }

    connectedCallback() {
        this.queryForElement("#toggle-info")
            .addEventListener("click", () => this.toggleBody());
    }

    disconnectedCallback() {
        this.queryForElement("#toggle-info").removeEventListener();
    }
}

window.customElements.define("user-card", UserCard);
