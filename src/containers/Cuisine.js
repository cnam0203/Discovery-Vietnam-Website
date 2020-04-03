import React, { Component } from 'react'
import MenuLink from '../components/MenuLink'
import './cuisine.css'



export default class Cuisine extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $(document).ready(function(){
            $("#north").mouseover(function(){
                $("#pho-br").css("animation", "slideshow 2s forwards");
            });
       });

       $(document).ready(function(){
            $("#north").mouseleave(function(){
                $("#pho-br").css("animation", "slidesout 2s forwards");
            });
        });
        $(document).ready(function(){
            $("#south").mouseover(function(){
                $("#banhmi").css("animation", "slideshow 2s forwards");
            });
       });
       $(document).ready(function(){
        $("#center").mouseleave(function(){
            $("#com-ga").css("animation", "slidesout 2s forwards");
        });
    });
    $(document).ready(function(){
        $("#center").mouseover(function(){
            $("#com-ga").css("animation", "slideshow 2s forwards");
        });
   });

       $(document).ready(function(){
            $("#south").mouseleave(function(){
                $("#banhmi").css("animation", "slidesout 2s forwards");
            });
        });
    }


    render() {
        return (
            <div id='container-cuisine'>
                <img src='/buncha.png' id='pho-br' />
                <img src='/banhmi.jpg' id='banhmi' />
                <img src='/com-ga.png' id='com-ga' />
                <div id='select-cuisine'>
                        <MenuLink label='Home' to='/' activeOnly={true}/>
                        <MenuLink label='History' to='/history' activeOnly={false}/>
                        <MenuLink label='Culture' to='/culture' activeOnly={false}/>
                        <MenuLink label='Cuisine' to='/cuisine' activeOnly={false}/>
                        <MenuLink label='Music' to='/music' activeOnly={false}/>
                        <MenuLink label='Beauty' to='/beauty' activeOnly={false}/>
                </div>
                <img src='/logo.png' id="logo-cuisine"/>
                <form className="example" action="action_page.php">
                    <input type="text" placeholder="Search.." name="search" />
                    <button type="submit"><i className="fa fa-search"></i></button>
                </form>
                <h1 className='region' id='north' style={{position: 'absolute', left: '28%', top: '70%'}}>NORTH</h1>
                <h1 className='region' id='center' style={{position: 'absolute', left: '30%', top: '75%'}}>CENTER</h1>
                <h1 className='region' id='south' style={{position: 'absolute', left: '32%', top: '80%'}}>SOUTH</h1>
            </div>
        )
    }
}