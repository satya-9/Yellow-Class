import React, { Component } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";

export class Unsplash extends Component {
  constructor(props){
    super(props)
  this.state = {
    images: [],
    count: 25,
    start: 1,
    Open:false,
    url:"",
    id:0
  };

}

  componentDidMount() {
    const { count, start } = this.state;
    axios
      .get(`https://api.unsplash.com/photos/random?client_id=phcRe5Gierl2yp5dpnjUZOZ9Xjz3BQQwCeNH0_-j4XA&count=${this.state.count}&start=${this.state.start}`)
      .then(res => this.setState({ images: res.data }));
  }
  //Be careful of using React methods and property
  //fetchImages=()=>{} can’t be written as fetchImages(){}
  fetchImages = () => {

    const { count, start } = this.state;
    this.setState({ start: this.state.start + count });
    axios
      .get(`https://api.unsplash.com/photos/random?client_id=phcRe5Gierl2yp5dpnjUZOZ9Xjz3BQQwCeNH0_-j4XA&count=${this.state.count}&start=${this.state.start}`)
      .then(res =>
        this.setState({ images: this.state.images.concat(res.data) })
      );
  };

  render() {
    if(!this.state.Open){
    return (
        <div>
          <h1 className="Heading">Unsplash Images</h1>
        <InfiniteScroll
          dataLength={this.state.images.length}
          next={this.fetchImages}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
        <div className='grid-container'>
          {this.state.images.map(image => (
            <div className="image">
            <img 
              src={image.urls.thumb} 
              onClick={() => {
              console.log(this.state.Open)
              this.setState({Open:!this.state.Open})
              this.setState({url:image.urls.thumb})
              this.setState({id:image.id})
            }
          }
              alt="image" />

            </div>
          ))}
          </div>
        </InfiniteScroll>
      </div>
    );
        }
    else{
      console.log(1)
      return(
        <div>
        <img src={this.state.url} onClick={
          ()=>{
            this.setState({Open:!this.state.Open})
            this.setState({url:""})
          }

        } />
        </div>
      )
    }
  }
}

export default Unsplash;