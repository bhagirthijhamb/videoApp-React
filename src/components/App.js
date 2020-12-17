import React from 'react';
import SearchBar from './SearchBar';
import youtube from './../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';

class App extends React.Component {
  state = { videos: [], selectedVideo: null }

  componentDidMount(){
    this.onTermSubmit('plants');
  }

  // callback function defined as arrow function
  onTermSubmit = async (term) => {
    console.log(term)
    // youtube is now a preconfigured instance of axios
    const response = await youtube.get('/search', {
      params: {
        q: term
      }
    })
    console.log(response.data.items)
    this.setState({ 
      videos: response.data.items,
      selectedVideo: response.data.items[0]
    })
  }

  // callback function defined as arrow function
  onVideoSelect = (video) => {
    // console.log('From the App', video);
    this.setState({ selectedVideo: video })
  }
  render(){
    return (
      <div className="ui container">
        <SearchBar onTermSubmit={this.onTermSubmit} />
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className="five wide column">
              <VideoList videos={this.state.videos} onVideoSelect={this.onVideoSelect} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;