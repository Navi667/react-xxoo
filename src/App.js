
import React, { Component } from 'react'
import './App.css';

const checkMate = function (game) {
  var arr = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  for (var i = 0; i < arr.length; i++) {
    let [index_1,index_2,index_3] = arr[i]
    if (game[index_1] !== null && game[index_1] === game[index_2] && game[index_2] === game[index_3]) {
      return game[index_1]
    }
  }
  return false
}




class History extends Component {
  constructor() {
    super()
  }

  render() {
    const {xIsNext , winner , history , jump} = this.props
    let title = ''

    if(winner){
      title = `Winner is ${winner}`
    }else{
      if(xIsNext){
        title = `Next is "X"`
      } else {
        title = `Next is "O"`
      }
    }

    return (
      <div className='history'>
        <h3>
          {title}
        </h3>
        
        <hr/>

        {/* 渲染历史记录 */}
         <ul>
          {
            history.map((value , key)=>{
              return(
                <li key = {key}>
              
                <button type='button' onClick={()=>jump(key)}>
                 {key === 0 ? "重新开始游戏" : `跳到游戏第 ${key} 步`}
                </button>
                </li>
              )
            })
          }
         </ul>
      </div>
    )
  }
}

class Square extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div className='box' onClick={this.props.handleClick}>{this.props.index}</div>
    )
  }
}


class Board extends Component {
  getSquare(i) {
    const {game , handleClick} = this.props
    return (
      <Square index={game[i]} handleClick={() => handleClick(i)}></Square>
    )
  }
  render() {
    return (
      <div className='box-wrap'>
        {this.getSquare(0)}
        {this.getSquare(1)}
        {this.getSquare(2)}
        {this.getSquare(3)}
        {this.getSquare(4)}
        {this.getSquare(5)}
        {this.getSquare(6)}
        {this.getSquare(7)}
        {this.getSquare(8)}
      </div>
    )
  }
}

class Game extends Component {
  constructor() {
    super()
    this.state = {
      history : [Array(9).fill(null)],
      xIsNext: true,
      nowStep : 0
    }
  }

  handleClick(i) {
    //i : 点击了第i个方块
    const { xIsNext , nowStep} = this.state

    let {history} = this.state
    history = history.slice(0,nowStep+1)

    //浅复制 解决 引用类型导致一个对象反复被修改的问题
    let game = history[nowStep].slice()
    
    //判断游戏是否有赢家 
    if(checkMate(game)){
      return 
    }

    //判断i这个位置是否被点击过 
    if (game[i]) {
      return
    }

    // xIsNext : 下一个玩家是 x 吗
    if (xIsNext) {
      game[i] = 'X'
    } else {
      game[i] = 'O'
    }


    this.setState({
      //concat方法用于拼接数组
      history : history.concat([game]),
      xIsNext: !xIsNext,
      nowStep : nowStep + 1
    })


  }
  jump(i){
    var xIsNext = i % 2 === 0 ? true : false
    var nowStep = i
    this.setState({
      xIsNext : xIsNext,
      nowStep : nowStep
    })
  }

  render() {
    const {history , xIsNext , nowStep} = this.state
    const game = history[nowStep]
    return (
      <div className='game'>
        <Board game = {game} handleClick={(index)=>this.handleClick(index)}></Board>
        <History jump = {(i)=>{this.jump(i)}} history = {history} xIsNext = {xIsNext} winner = {checkMate(game)}></History>

      </div>
    )
  }

}

class App extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <Game></Game>
      </div>
    )
  }
}

export default App;
