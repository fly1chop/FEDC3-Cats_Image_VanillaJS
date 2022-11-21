import { request } from "./api.js";
import ImageViewer from "./ImageViewer.js";
import Nodes from "./Nodes.js";

export default function App({ $target }) {
  this.state = {
    isRoot: true,
    nodes: [],
    selectedImageUrl: null
  };
  const nodes = new Nodes({
    $target,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes
    },
    onClick: async (node) => {
      if(node.type === 'DIRECTORY') {
        await fetchNodes(node.id);
      }

      if(node.type === 'FILE') {
        this.setState({
          ...this.state,
          selectedImageUrl: `https://kdt-frontend.cat-api.programmers.co.kr/static${node.filePath}`
        })
      }
    },
  });

  const imageViewer = new ImageViewer({ 
    $target,
    onClose: () => {
      this.setState({
        ...this.state,
        selectedImageUrl: null
      })
    }
  })

  this.setState = (nextState) => {
    this.state = nextState;

    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });

    imageViewer.setState({
      selectedImageUrl: this.state.selectedImageUrl
    })
  };

  const fetchNodes = async (id) => {
    const nodes = await request(id ? `/${id}` : "/");

    this.setState({
      ...this.state,
      nodes,
      isRoot: id ? false : true,
    });
  };

  fetchNodes();
}
