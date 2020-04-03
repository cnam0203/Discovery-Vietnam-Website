import React, { Component } from 'react'
import Navigator from '../components/Navigator'
import Logo from '../components/Logo'
import SearchBar from '../components/SearchBar'
import './cuisine.css'



export default class Cuisine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTxt: ''
        }
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
                <Navigator />
                <Logo />
                <SearchBar />
                <h1 className='region' id='north' style={{position: 'absolute', left: '28%', top: '70%'}}>NORTH</h1>
                <h1 className='region' id='center' style={{position: 'absolute', left: '30%', top: '75%'}}>CENTER</h1>
                <h1 className='region' id='south' style={{position: 'absolute', left: '32%', top: '80%'}}>SOUTH</h1>
            </div>
        )
    }
}