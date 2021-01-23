const e = React.createElement;

class NewsResult extends React.Component {

    constructor(props) {
  
      super(props);
    
      this.state = { 
  
      };
  
    }

    render() {

        return e("h1", { key: "title" }, "BT React Code Test - by Chris Plevey - 22/01/21");    
        
      }
    }  
    
    ReactDOM.render(e(NewsResult), document.getElementById("root"));
    