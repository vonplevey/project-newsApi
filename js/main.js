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
                
        this.setState({search : event.target.value});  
    }

    async searchNewsApi() {

        if (!this.state.search.length) {            

            return;
        }

        const searchResult = this.state.search;

        let response = await fetch(`https://newsapi.org/v2/everything?q=${searchResult}&apiKey=4f5486283b504c40b246f2c481f0b95b`);

        console.log(response);
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
    