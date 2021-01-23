const e = React.createElement;

class NewsResult extends React.Component {

    constructor(props) {
  
      super(props);
    
      this.state = {             
        search: "",
        newsResults: [],
      };
  
    }

    handleSearchChange(event) {    
        
        console.log(event.target.value);

        this.setState({search : event.target.value});  

    }

    searchNewsApi() {

        console.log(1)

    }

    render() {

        return e("h1", { key: "title" }, "BT React Code Test - by Chris Plevey - 22/01/21"),        
            e("div", {key: "inline-search", className: "inline-search"}, [
            e("label",{ key: "inline-search-label", htmlFor:"article-search"}, "NewsApi Search:"),
            e("input", {
                key: "input",
                type: "text", 
                id: "article-search",
                placeholder: "Search",          
                value: this.state.search,
                onChange: event => this.handleSearchChange(event)
            }),     
            e(
                "button",
                { key: "search-btn", onClick: () => this.searchNewsApi() },
                "Search"
            ),
            ]);        
      }
    }  
    
    ReactDOM.render(e(NewsResult), document.getElementById("root"));
    