import "https://cdn.jsdelivr.net/npm/marked/marked.min.js"

class MarkdownComponent extends HTMLElement {
  connectedCallback(){
    const content = this.textContent
    this.innerHTML = marked.parse(content)
  }
}

customElements.define('mark-down', MarkdownComponent)


