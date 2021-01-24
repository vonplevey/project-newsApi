const e = React.createElement;

class NewsResult extends React.Component {

    constructor(props) {

        super(props);

        this.state = {   

            search: "",
            newsResults: [],    
            noResult: "",
            apiError: "", 
            loading: "", 

        };

    }

    handleSearchChange(event) {    
                
        this.setState({search: event.target.value});  
    }

    async searchNewsApi() {

        if (!this.state.search.length) {     
            
            this.setState({noResult: "Please provide a search term", apiError: "", newsResults: [], search: "", loading: ""});
            return;
        }

        const searchResult = this.state.search;

        let response = await fetch(`https://newsapi.org/v2/everything?q=${searchResult}&apiKey=4f5486283b504c40b246f2c481f0b95b`);

        if (!response) {
            // show loading text until fetch resolves
            this.setState({loading:"Loading...", noResult: "", apiError: "", newsResults: [], search: "", });
      
        } else {

            if (!response.ok) {
        
                const errorMessage = await response.json();      
                // set error message from json
                this.setState({apiError: errorMessage.message ? errorMessage.message : 'Error retrieving data, please contact the development team.', noResult: "", newsResults: [], search: "", loading:""}); 
                
            } else {    
            
                const newsResults = await response.json();   
                
                if (newsResults.totalResults === 0) {
        
                    this.setState({noResult: "No result for this search, please try again", newsResults: [], search: "", apiError: "", loading:""}); 
        
                } else {        
                    //return top 10 results
                    const newsResultsTopTen = newsResults.articles.slice(0, 10);     
        
                    this.setState({newsResults: newsResultsTopTen, noResult: "",  apiError: "",  search: "", loading: ""});               
                }
            }
        }    
    }

    render() {

        return e("div", null, [ 
            e("h1", { key: "title" }, "BT React Code Test - by Chris Plevey - 22/01/21"),        
            
            e("div", { key: "inline-search", className: "inline-search" }, [
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
            ]),
           
            e("ul", { key:"articles" }, 
            this.state.newsResults.map((item, index) => 
              e("li",  {
                key: index, className: "api-articles"
              }, e("div", null, item.title  ? `Title: ${item.title}` : "N/A"),
                 e("div", null, item.author ? `Author: ${item.author}` : "N/A"),                              
                 e("div", null, item.description ? `Description: ${item.description.slice(0, 150)}` : "N/A"), 
                 e("a", item.url ? { href: item.url, target: "_blank", rel :"noopener noreferrer" } : null,  item.url ? "Read more" : "N/A")
            ))),
            
            e("h3", { key: "no-result" }, this.state.noResult),
            e("h3", { key: "api-error"}, this.state.apiError),
            e("h3", { key: "loading"}, this.state.loading)
        ]);
      }
    }  
    
    ReactDOM.render(e(NewsResult), document.getElementById("root"));
    