import React from 'react'
import '../App.css';
import Search from './Search'
import UserInfo from './User-info'
import Actions from './Actions';
import Repos from './repos';
import PropTypes from 'prop-types'

const appContent = ({userinfo, repos, starred, isFetching, handleSearch, getRepos, getStarred }) =>(
    <div className="App">
        <Search isDisabled={isFetching} handleSearch={handleSearch} />
        {isFetching && <div>Carregando...</div>}
        {!!userinfo && <UserInfo userinfo={userinfo}/>}
        {!!userinfo && <Actions getRepos={getRepos} getStarred={getStarred}/>}
        <div className="all-repos">
            {!!repos.length  && 
                <Repos className='repos' title='Repositórios' 
                    repos={repos}
                />
            }
            
            {!!starred.length && 
                <Repos className='starred' title='Favoritos:' 
                    repos={starred}
                />
            }
        </div>
  
      </div>
)

appContent.propType = {
    userinfo: PropTypes.object, 
    repos: PropTypes.array.isRequired, 
    starred: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired, 
    handleSearch: PropTypes.func.isRequired, 
    getRepos: PropTypes.func.isRequired, 
    getStarred: PropTypes.func.isRequired 
} 
export default appContent
