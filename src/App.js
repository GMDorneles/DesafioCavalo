import React, { Component } from 'react';
import cavalo from './img/cav.png';
import './index.css'
class App extends Component{
    constructor(props){
        super(props);
        this.state ={
            posicao:'',
            letra:'',
            numero:'',
            top:8,
            left:8,
            arrL:[],    
        }
        this.trocaPosicao =this.trocaPosicao.bind(this);
        this.validar =this.validar.bind(this);
        this.logica =this.logica.bind(this);
        this.marcar=this.marcar.bind(this);
    }
    trocaPosicao(e){
        
        let state = this.state;
        let NewPosicao = e.target.value;

        this.setState({posicao:NewPosicao});
        e.preventDefault();
        
    }
    validar(e){
        e.preventDefault();
        let state = this.state;
        state.posicao=state.posicao.toLowerCase();
        state.numero= state.posicao.replace(/[^0-9]/g,'');
        state.letra= state.posicao.replace(/[0-9]/g,'');
        switch (state.letra){
            case ('a'||'A'):
                state.arrL[0]=`A- ${state.numero}`;
                state.letra=0
            break;
            case ("b"||'B'):
                state.arrL[0]=`B- ${state.numero}`;
                state.letra=1;
            break;
            case ("c"||'C'):
                state.arrL[0]=`C- ${state.numero}`;
                state.letra=2;
            break;
            case ("d"||'D'):
                state.arrL[0]=`D- ${state.numero}`;
                state.letra=3;
            break;
            case ("e"||'E'):
                state.arrL[0]=`E- ${state.numero}`;
                state.letra=4;
            break;
            case ("f"||'F'):
                state.arrL[0]=`F- ${state.numero}`;
                state.letra=5;
            break;
            case ("g"||'G'):
                state.arrL[0]=`G- ${state.numero}`;
                state.letra=6;
            break;
            case ("h"||'H'):
                state.arrL[0]=`H- ${state.numero}`;
                state.letra=7;
            break;
            default:
                state.letra=8;
        }
        
        if(state.numero>0 && state.numero<9 && state.letra<=7){
            state.numero=state.numero-1;
            this.logica();


        }else{
            return alert('Casas inválidas! Escolha apenas uma letra de A a H e um número de 1 a 8.');
        }
    }
    marcar(mov,c,v){
        let state=this.state;
        switch (v){
            case (0): 
            state.arrL[mov-1]=`*A - ${c+1} `;
            break;
            case (1):
                state.arrL[mov-1]=`*B- ${c+1} `;
            break;
            case (2):
                state.arrL[mov-1]=`*C - ${c+1} `;
            break;
            case (3):
                state.arrL[mov-1]=`*D - ${c+1} `;
            break;
            case (4):
                state.arrL[mov-1]=`*E - ${c+1} `;
            break;
            case (5):
                state.arrL[mov-1]=`*F - ${c+1} `;
            break;
            case (6):
                state.arrL[mov-1]=`*G - ${c+1} `;
            break;
            case (7):
                state.arrL[mov-1]=`*H - ${c+1} `;
            break;
        }
        
    }

    logica(){
        let state=this.state;
        const withinBounds = i => i > -1 && i < 8;

        const countOutboundMoves = (board, r, c, moves) => {
          board[r][c] = 0;
          for(let move of moves)
            if(withinBounds(move.r + r) && withinBounds(move.c + c))
              board[r][c] += 1;             
        }
        
        const initBoardState = moves => {     
          const board = new Array(8);
          for(let r = 0; r < 8; ++r)
            board[r] = new Array(8);
          
          for(let r = 0; r < 8; ++r)
            for (let c = 0; c < 8; ++c)
              countOutboundMoves(board, r, c, moves);
          
          return board;
        }

        const movimentos = (r, c, moves, moveNumber, board, side) => {

          if (moveNumber > 64){
            return;
          }
          let nextR = 0, nextC = 0, minOutbound = 9;
            for(let move of moves) {
            const CR = move.r + r;
            const CC = move.c + c;
            if(withinBounds(CR) && withinBounds(CC) && board[CR][CC] < minOutbound) {
              minOutbound = board[CR][CC];
              nextR = CR;
              nextC = CC;
            }
          }

          board[r][c] = 100;
          for(let move of moves) {
        
            const LR = move.r + r;
        
            const LC = move.c + c;
            if(withinBounds(LR) && withinBounds(LC)) {
              board[LR][LC]--;
            }
          }
        
          let newLeft= r * side + 8;
          this.setState({left:newLeft});
          let newTop = c * side + 8;
          this.setState({top:newTop});
          this.marcar(moveNumber,r,c);

          setTimeout(() => {
            movimentos(nextR, nextC, moves, moveNumber + 1, board, side);
          }, 500);
        }
        const moves = [
            {r: -2, c: -1},
            {r: -2, c:  1},
            {r:  2, c: -1},
            {r:  2, c:  1},
            {r: -1, c: -2},
            {r: -1, c:  2},
            {r:  1, c: -2},
            {r:  1, c:  2},
        ];
        const side = 50;

        const board = initBoardState(moves);
        movimentos(state.numero,state.letra, moves, 1, board, side);
    }
        
   
    render(){
        
        return(
            <div className="container">
                <div className='tabuleiro'>
                <img  src={cavalo} alt='cavalo' style={{zIndex:999, position:'absolute',left:this.state.left,top:this.state.top}}/>
                <div id='1-1' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*0,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*0,zIndex:0} }/>
                <div id='1-2' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*1,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*0,zIndex:0} }/>
                <div id='1-3' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*2,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*0,zIndex:0} }/>
                <div id='1-4' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*3,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*0,zIndex:0} }/>
                <div id='1-5' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*4,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*0,zIndex:0} }/>
                <div id='1-6' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*5,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*0,zIndex:0} }/>
                <div id='1-7' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*6,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*0,zIndex:0} }/>
                <div id='1-8' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*7,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*0,zIndex:0} }/>
                <div id='2-1' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*0,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*1,zIndex:0} }/>
                <div id='2-2' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*1,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*1,zIndex:0} }/>
                <div id='2-3' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*2,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*1,zIndex:0} }/>
                <div id='2-4' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*3,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*1,zIndex:0} }/>
                <div id='2-5' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*4,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*1,zIndex:0} }/>
                <div id='2-6' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*5,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*1,zIndex:0} }/>
                <div id='2-7' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*6,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*1,zIndex:0} }/>
                <div id='2-8' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*7,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*1,zIndex:0} }/>
                <div id='3-1' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*0,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*2,zIndex:0} }/>
                <div id='3-2' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*1,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*2,zIndex:0} }/>
                <div id='3-3' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*2,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*2,zIndex:0} }/>
                <div id='3-4' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*3,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*2,zIndex:0} }/>
                <div id='3-5' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*4,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*2,zIndex:0} }/>
                <div id='3-6' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*5,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*2,zIndex:0} }/>
                <div id='3-7' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*6,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*2,zIndex:0} }/>
                <div id='3-8' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*7,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*2,zIndex:0} }/>
                <div id='4-1' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*0,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*3,zIndex:0} }/>
                <div id='4-2' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*1,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*3,zIndex:0} }/>
                <div id='4-3' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*2,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*3,zIndex:0} }/>
                <div id='4-4' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*3,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*3,zIndex:0} }/>
                <div id='4-5' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*4,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*3,zIndex:0} }/>
                <div id='4-6' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*5,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*3,zIndex:0} }/>
                <div id='4-7' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*6,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*3,zIndex:0} }/>
                <div id='4-8' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*7,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*3,zIndex:0} }/>
                <div id='5-1' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*0,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*4,zIndex:0} }/>
                <div id='5-2' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*1,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*4,zIndex:0} }/>
                <div id='5-3' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*2,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*4,zIndex:0} }/>
                <div id='5-4' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*3,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*4,zIndex:0} }/>
                <div id='5-5' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*4,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*4,zIndex:0} }/>
                <div id='5-6' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*5,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*4,zIndex:0} }/>
                <div id='5-7' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*6,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*4,zIndex:0} }/>
                <div id='5-8' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*7,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*4,zIndex:0} }/>
                <div id='6-1' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*0,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*5,zIndex:0} }/>
                <div id='6-2' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*1,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*5,zIndex:0} }/>
                <div id='6-3' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*2,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*5,zIndex:0} }/>
                <div id='6-4' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*3,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*5,zIndex:0} }/>
                <div id='6-5' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*4,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*5,zIndex:0} }/>
                <div id='6-6' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*5,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*5,zIndex:0} }/>
                <div id='6-7' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*6,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*5,zIndex:0} }/>
                <div id='6-8' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*7,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*5,zIndex:0} }/>
                <div id='7-1' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*0,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*6,zIndex:0} }/>
                <div id='7-2' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*1,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*6,zIndex:0} }/>
                <div id='7-3' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*2,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*6,zIndex:0} }/>
                <div id='7-4' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*3,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*6,zIndex:0} }/>
                <div id='7-5' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*4,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*6,zIndex:0} }/>
                <div id='7-6' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*5,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*6,zIndex:0} }/>
                <div id='7-7' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*6,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*6,zIndex:0} }/>
                <div id='7-8' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*7,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*6,zIndex:0} }/>
                <div id='8-1' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*0,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*7,zIndex:0} }/>
                <div id='8-2' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*1,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*7,zIndex:0} }/>
                <div id='8-3' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*2,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*7,zIndex:0} }/>
                <div id='8-4' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*3,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*7,zIndex:0} }/>
                <div id='8-5' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*4,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*7,zIndex:0} }/>
                <div id='8-6' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*5,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*7,zIndex:0} }/>
                <div id='8-7' style={{backgroundColor:'black',color:'white', width:50, height:50,left:50*6,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*7,zIndex:0} }/>
                <div id='8-8' style={{backgroundColor:'white',color:'black', width:50, height:50,left:50*7,position:'absolute',textAlign:'center',lineHeight:'50px',top:50*7,zIndex:0} }/>
                
            </div>
                <form style={{marginTop:'400px'}}>
                    <label>
                        Posição:
                        <input type="text" value={this.state.posicao} onChange={this.trocaPosicao} />
                    </label>
                    <input type="submit"  name='Enviar' onClick={this.validar} />
                </form>
                <div id='lisa' style={{ position:'relative'}}>
                    <ul>
                        {this.state.arrL.map(item => (
                            <li style={{display: 'inline-block',margin:'8px'}} key={item}>{item}</li>
                        ))}
                        </ul>
                </div>

            </div>
            
        );
    }
}
export default App;
