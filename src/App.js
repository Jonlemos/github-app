import React, {Component} from 'react';
import AppContent from './Components/app-content';
import ajax from '@fdaciuk/ajax'


class App extends Component {
  constructor() {
    super()
    this.state = {
      userinfo: null,
      repos:[],
      starred:[],
      isFetching: false,
    }
  }

  getGithubApiUrl(username, type){
    const internalUser = username ? `/${username}`:''
    const internalType = type ? `/${type}`:''
    return `https://api.github.com/users${internalUser}${internalType}`

  }
  handleSearch(e) {
    const value = e.target.value
    const keyCode = e.which || e.keyCode
    const ENTER = 13
    // e.persist()
    // const target = e.target

    if(keyCode === ENTER) {
      this.setState({
        isFetching:true
      })
      // e.target.disable = true
      ajax().get(this.getGithubApiUrl(value)).then((result)=>{
          this.setState({
            userinfo:{
              username: result.name,
              photo: result.avatar_url,
              login: result.login,
              repos: result.public_repos,
              followers: result.followers,
              following: result.following
            },
            repos: [],
            starred: [],
          })
      })
      .always(() =>{
        this.setState({
          isFetching: false
        })
        // target.disable = false
      })
    }
  }

  getRepos(type) {
    return(e) => {
      const username = this.state.userinfo.login
      ajax().get(this.getGithubApiUrl(username, type))
      .then((result) => {
        this.setState({
          [type]: result.map((repos) => ({
            name: repos.name,
            link: repos.html_url
            })
          )
        })
      })
    }
  }
  render() {
    return (
      <AppContent
        {...this.state}
        // userinfo={this.state.userinfo}
        // repos = {this.state.repos}
        // starred = {this.state.starred}
        // isFetching={this.state.isFetching}
        handleSearch={(e) => this.handleSearch(e)}
        getRepos={ this.getRepos('repos')}
        getStarred={ this.getRepos('starred')}
        
      />
    );
  }
   
}

export default App;
