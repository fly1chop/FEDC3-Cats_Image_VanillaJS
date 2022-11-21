export default function Nodes({ $target, initialState, onClick }) {
  const $nodes = document.createElement("div");
  $nodes.classList.add('nodes');
  $target.appendChild($nodes);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { isRoot, nodes } = this.state;
    
    $nodes.innerHTML = `
      ${isRoot ? '' : `
        <div class="Node">
          <img src="https://cdn.roto.codes/images/prev.png" />
        </div>
      `}
      ${nodes.map(node => `
          <div class="Node" data-id="${node.id}">
            <img src="https://cdn.roto.codes/images/${node.type === 'DIRECTORY' ? 'directory' : 'file'}.png" />
            ${node.name}
          </div>
      `).join('')}
    `
  };

  this.render();

  $nodes.addEventListener('click', e => {
    const $node = e.target.closest('.Node');
    if(!$node) return;
    const { id } = $node.dataset;

    if(!id) {
      // 뒤로가기 누른거 처리
    }

    const node = this.state.nodes.find(node => node.id === id);

    if(node) {
      onClick(node);
    } else {
      alert('올바르지 않은 Node입니다.')
    }
  })
}
