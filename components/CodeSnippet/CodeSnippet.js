/// @ts-check

class CodeSnippet extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    // fetch template and add to shadow root
    const shadow = this.attachShadow({ mode: 'open' });

    const parser = new DOMParser();
    const templateContents = await fetch('./components/CodeSnippet/template.html').then(d => d.text());

    const template = parser.parseFromString(templateContents, 'text/html');

    // fetch source file and add it to inner code element
    const fileName = this.getAttribute('src');
    if (!fileName) return;

    const sourceCode = await fetch(fileName).then(d => d.text());

    const codeBlock = template.querySelector('code');
    if (!codeBlock) return;

    codeBlock.innerText = sourceCode;

    // register click handler

    const copyButton = template.querySelector('button');

    copyButton?.addEventListener('click', () => {
      navigator.clipboard.writeText(sourceCode);
    });

    for (const child of template.children) {
      shadow.appendChild(child);
    }
  }
}

customElements.define('code-snippet', CodeSnippet);
