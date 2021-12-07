class Circle extends HTMLElement { 
  constructor () { 
      super () 
      this.shadow = this.attachShadow({ mode: 'closed' })      
      this.circle = this.shadow.appendChild(document.createElement('div'))
  } 
 
  connectedCallback () { 
    this.circle.style = `
      background: ${this.getAttribute('color')}; 
      width: ${this.getAttribute('size')}px; 
      height: ${this.getAttribute('size')}px; 
      border-radius: 50%; 
      position: absolute; 
      top: ${this.getAttribute('top')}px; 
      left: ${this.getAttribute('left')}px; 
      transition: all 1.3s ease; 
    ` 
  } 

  static get observedAttributes() {
    return ['color', 'size', 'top', 'left']
  }

  attributeChangedCallback (attrName, oldVal, newVal) {
    switch (attrName) {
      case 'color':
        Object.assign(this.circle.style, {background: newVal})
        break
      case 'size':
        Object.assign(this.circle.style, {
          width: `${newVal}px`,
          height: `${newVal}px`
        })
        break
      case 'top':
        Object.assign(this.circle.style, {top: `${newVal}px`})
        break
      case 'left':
        Object.assign(this.circle.style, {left: `${newVal}px`})
        break
      default:
    }
  }
}

customElements.define('circle-element', Circle)

for (let i = 0; i < 30; i++) { 
    const elem = document.createElement('circle-element') 
    const [size, top, left] = [ 
        Math.max(Math.random() * 100, 40), 
        Math.random() * window.innerHeight, 
        Math.random() * window.innerWidth 
    ] 
 
    const colors = ['#f0f', '#fa0', '#f50', '#09b', '#090', '#ADFF2F', '#FFA07A', '#FF1493', '#FF8C00', '#00FFFF', '#EE82EE', '#00BFFF', '#6B8E23	', '#800080']
    const color = colors[Math.round(Math.random() * (colors.length - 1))] 
 
    elem.setAttribute('size', size) 
    elem.setAttribute('top', top) 
    elem.setAttribute('left', left) 
    elem.setAttribute('color', color) 
 
    document.body.appendChild(elem)    
} 

document.body.onclick = function (event) { 
  const collection = document.getElementsByTagName('circle-element') 
  const elems = Array.from(collection) 
  elems.forEach(elem => { 
    elem.setAttribute('top', Math.random() * window.innerHeight) 
    elem.setAttribute('left', Math.random() * window.innerWidth) 
  }) 
}