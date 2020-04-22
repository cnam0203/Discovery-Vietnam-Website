import React, { Component } from 'react'
import './addrecipe.css'
import Navigator from '../components/Navigator'
import Logo from '../components/Logo'
import SearchBar from '../components/SearchBar'
import SignIn from '../components/SignIn'
import SignInModal from '../components/SignInModal'
import { connect } from 'react-redux'
import IngredientItem from '../components/IngredientItem'
import PartItem from '../components/PartItem'
import DirectionInput from '../components/DirectionInput'
import DirectionItem from '../components/DirectionItem'


class AddRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            level: 'easy',
            time: '',
            serves: '',
            img: null,
            addIngredient: false,
            ingredients: [],
            parts: [],
            partName: '',
            amount: '',
            ingreName: '',
            unit: '', 
            editIngre: false,
            editPart: false,
            directions: [],
            description: ''
        }
        this.remove = this.remove.bind(this)
        this.edit = this.edit.bind(this)
        this.removePart = this.removePart.bind(this)
        this.editPart = this.editPart.bind(this)
        this.removeInput = this.removeInput.bind(this)
        this.addInput = this.addInput.bind(this)
        this.addIngre = this.addIngre.bind(this)
        this.removePartInput = this.removePartInput.bind(this)
        this.addPartInput = this.addPartInput.bind(this)
        this.addPart = this.addPart.bind(this)
        this.removeIngrePart = this.removeIngrePart.bind(this)
        this.editIngrePart = this.editIngrePart.bind(this)
        this.addIngrePart = this.addIngrePart.bind(this)
        this.updateImage = this.updateImage.bind(this)
        this.updateDirection = this.updateDirection.bind(this)
        this.uploadImage = this.uploadImage.bind(this)
        this.editDirection = this.editDirection.bind(this)
        this.editImage = this.editImage.bind(this)
        this.removeImg = this.removeImg.bind(this)
        this.removeContent = this.removeContent.bind(this)
        this.uploadRecipe = this.uploadRecipe.bind(this)
    }

    uploadRecipe() {
        const { directions, name, img, time, level, serves, ingredients, parts, description } = this.state;
        const date = Date.now()
        var form = new FormData();
        form.append('image', img, date + '-' + img.name);
        for (var index = 0; index < directions.length; index++) {
            if (directions[index].kind === 1) {
                form.append('image', directions[index].img, date + '-' + directions[index].img.name)
            }
        }
        const imgUrl = date + '-' + img.name;
        const instructions = [];
        for (var index = 0; index < directions.length; index++) {
            if (directions[index].kind == 1) {
                const { content, img, kind, title, id} = directions[index]
                const newInstruction = {
                    content: content,
                    img: date + '-' + img.name,
                    title: title,
                    id: id,
                    kind: kind
                }
                instructions.push(newInstruction)
            } else {
                instructions.push(directions[index])
            }
        }
        const recipe = {
            description: description,
            name: name, 
            time: time,
            level: level,
            serves: serves,
            ingredients: ingredients,
            parts: parts,
            imgUrl: imgUrl,
            directions: instructions
        }
        form.append('recipe', JSON.stringify(recipe));
        fetch('/uploadNewRecipe', {
            method: 'POST',
            body: form
        })
        .then(response => response.json())
        .then((response) => {
            if (response.errors != null) {
                alert(response.errors)
            } else {
                alert('Uploaded successfully')
            }
        })
        .catch(err => console.log(err))
    }

    uploadImage(e) {
        this.setState({img: e.target.files[0]})
    }

    updateImage(img, title, index) {
        const direction = {
            img: img,
            title: title,
            content: null,
            kind: 1,
            id: Date.now()
        }
        const newDirections  =this.state.directions
        newDirections.splice(index/2, 0, direction)
        this.setState({directions: newDirections})
    }

    updateDirection(content, index) {
        const direction = {
            img: null,
            title: null,
            content: content,
            kind: 0,
            id: Date.now()
        }

        const newDirections  =this.state.directions
        newDirections.splice(index/2, 0, direction)
        this.setState({directions: newDirections})
    }

    editImage(img, title, index) {
        const newDirections = this.state.directions
        newDirections[(index-1)/2].img = img
        newDirections[(index-1)/2].title = title
        this.setState({directions: newDirections})
    }

    editDirection(content, index) {
        const newDirections = this.state.directions
        newDirections[(index-1)/2].content = content
        this.setState({directions: newDirections})
    }

    removeImg(index) {
        const newDirections = this.state.directions
        newDirections.splice((index-1)/2, 1)
        this.setState({directions: newDirections})
    }

    removeContent(index) {
        console.log(index)
        const newDirections = this.state.directions
        newDirections.splice((index-1)/2, 1)
        this.setState({directions: newDirections})
    }

    addIngrePart(index, recipe) {
        const oldParts = this.state.parts
        oldParts[index].ingredients.push({
            name: recipe.name,
            amount: recipe.amount,
            unit: recipe.unit,
            id: oldParts[index].ingredients.length == 0 ? 0 : oldParts[index].ingredients[oldParts[index].ingredients.length-1].id + 1
        })
        this.setState({parts: oldParts})
    }

    removePart(index) {
        this.setState({parts: this.state.parts.filter((_, i) => i !== index)})
    }

    removeIngrePart(index, partIndex) {
        const oldParts = this.state.parts
        var b = oldParts[partIndex].ingredients.splice(index, 1)
        this.setState({parts: oldParts})
    }

    editPart(index, name) {
        const updateParts = this.state.parts;
        updateParts[index].name = name;
        this.setState({parts: updateParts})
    }

    editIngrePart(index, recipe, partIndex) {
        const oldParts = this.state.parts
        oldParts[partIndex].ingredients[index] = recipe
        this.setState({parts: oldParts})
    }

    remove(index) {
        this.setState({ingredients: this.state.ingredients.filter((_, i) => i !== index)})
    }

    edit(index, recipe) {
        const updateRecipes = this.state.ingredients;
        updateRecipes[index] = recipe;
        this.setState({ingredients: updateRecipes})
    }

    removeInput() {
        this.setState({amount: ''})
        this.setState({ingreName: ''})
        this.setState({unit: ''})
        this.setState({editIngre: false})
    }

    removePartInput() {
        this.setState({partName: ''})
        this.setState({editPart: false})
    }

    addIngre() {
            this.setState({editIngre: true})
    }

    addPart() {
            this.setState({editPart: true})
    }

    addInput() {
        const recipe = {
            amount: this.state.amount,
            name: this.state.ingreName,
            unit: this.state.unit,
            id: this.state.ingredients.length == 0 ? 0 : this.state.ingredients[this.state.ingredients.length - 1].id + 2
        }
        const oldIngredients = this.state.ingredients;
        oldIngredients.push(recipe)
        this.setState({ingredients: oldIngredients})
        this.setState({amount: ''})
        this.setState({ingreName: ''})
        this.setState({unit: ''})
        this.setState({editIngre: false})
    }

    addPartInput() {
        const part = {
            name: this.state.partName,
            ingredients: [],
            id: this.state.parts.length == 0 ? 0 : this.state.parts[this.state.parts.length - 1].id + 2
        }
        const oldParts = this.state.parts;
        oldParts.push(part)
        this.setState({parts: oldParts})
        this.setState({partName: ''})
        this.setState({editPart: false})
    }

    componentDidMount() {
        var textarea = document.getElementById('add-recipe-description')
        textarea.addEventListener('keydown', autosize);

        function autosize(){
        var el = this;
        setTimeout(function(){
            el.style.cssText = 'height:auto; padding:0';
            // for box-sizing other than "content-box" use:
            // el.style.cssText = '-moz-box-sizing:content-box';
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
        },0);
        }
    }


    render() {
        return (
            <div id="add-recipe-container">
                <div id="add-recipe-header">
                    <Logo />
                    <Navigator />
                    <SearchBar />
                    <SignIn isSignIn={this.props.isSignIn}/>
                    <SignInModal isShowModal={this.props.isShowModal}/>
                    <p id="add-recipe-title">INNOVATE YUMMY RECIPES</p>
                    <i className="fa fa-upload"  id="add-recipe" style={{position: "absolute", bottom: '5%', right: '2%'}}
                            onClick={() =>{this.uploadRecipe()}}><b id="add-recipe-text" style={{marginLeft: 5}}>Upload recipe</b></i>
                </div>
                <div id="add-recipe-content">
                    <div id="add-recipe-center">
                        <p>
                            <input type="text" value={this.state.name} placeholder="Recipe's name ..." onChange={(e) => {this.setState({name: e.target.value})}} id="add-recipe-name"></input>
                        </p>
                        {
                            this.state.img != null ? (
                                <img src={URL.createObjectURL(this.state.img)} className="input-image-img"></img>
                            ) : null
                        }
                        <div id="add-recipe-btn" onClick={() => {$("#upload-image").click();}}>
                        <i className="fa fa-upload upload" aria-hidden="true"></i>
                            {
                                this.state.img != null ? 'EDIT IMAGE' : 'UPLOAD IMAGE'
                            }
                        </div>
                        <p>
                            <textarea type="text" rows='1' placeholder="Description ..." onChange={(e) => {this.setState({description: e.target.value})}} id="add-recipe-description"></textarea>
                        </p>
                        <input type="file" name="file" id="upload-image" onChange={(e) => this.uploadImage(e)} style={{display: 'none'}}></input>
                    </div>
                    <div id="add-recipe-left-col">
                        <div id="info-container">
                            <p className="direction-title">{`INFORMATION `}
                                <i className="fa fa-info-circle" aria-hidden="true"></i>
                            </p>
                            <div id="add-recipe-info">
                                <div className="add-recipe-time">
                                    TIME:
                                    <input type="text" value={this.state.time} placeholder="Ex: 30 mins" onChange={(e) => {this.setState({time: e.target.value})}} id="add-recipe-time-input"></input>
                                </div>
                                <div className="add-recipe-serve">
                                    SERVES:
                                    <input type="number" step="1" min="1" value={this.state.serves} placeholder="Ex: 2" onChange={(e) => {this.setState({serves: e.target.value})}} id="add-recipe-serve-input"></input>
                                </div>
                                <div className="add-recipe-level">
                                    <div className="inner" >LEVEL: </div>
                                    <select className="inner" name="category" value={this.state.level} onChange={(e) => {this.setState({level: e.target.value})}} id="select-div">
                                        <option value="easy">EASY</option>
                                        <option value="medium">MEDIUM</option>
                                        <option value="difficult">DIFFICULT</option>
                                    </select>
                                    {/* <input type="text" value={this.state.level} placeholder="Ex: Easy" onChange={(e) => {this.setState({level: e.target.value})}} id="add-recipe-level-input"></input> */}
                                </div>
                            </div>
                        </div>
                        <div className="add-recipe-ingredients">
                            <p id="add-recipe-ingredients-title">{`INGREDIENTS `}
                                <i className="fa fa-apple" aria-hidden="true"></i>
                            </p>
                            <div style={{width:'100%'}} className="ingre-container">
                                {
                                    this.state.parts.map((item, index) => {
                                        return (
                                            <PartItem name={item.name} ingredients={item.ingredients} removePart={this.removePart} 
                                            addIngrePart={this.addIngrePart}
                                            editPart={this.editPart}
                                            removeIngrePart={this.removeIngrePart} 
                                            editIngrePart={this.editIngrePart} 
                                            idx={index} 
                                            key={item.id}  />
                                        )
                                    })
                                }
                                {
                                    this.state.editPart == true ? (
                                        <div style={{width: '100%', display: 'block'}}>
                                            <div className="new-title">New part: </div>
                                            <div id="add-recipe-part">
                                                <input placeholder="Part..." type="text" className="add-recipe-part-name input" value={this.state.partName} onChange={(e) => {this.setState({partName: e.target.value})}}></input>
                                                <i className="fa fa-check check" onClick={() => {this.addPartInput()}}></i>
                                                <i className="fa fa-times remove" onClick={() => {this.removePartInput()}}></i>
                                            </div> 
                                        </div>
                                    ) : (
                                        <div id="add-recipe-btn-big" onClick={() => {this.addPart()}}>
                                            ADD MAIN PART
                                        </div>
                                    )
                                }
                            </div>
                            <div style={{width:'100%'}} className="ingre-container">
                                    {
                                        this.state.ingredients.map((item, index) => {
                                            return (
                                                <IngredientItem recipe={item} kind={0} remove={this.remove} edit={this.edit} idx={index} key={item.id} /> 
                                            )
                                        })
                                    }
                                {
                                    this.state.editIngre == true ? (
                                        <div style={{width: '100%', display: 'block'}}>
                                            <div className="new-title">New ingredient: </div>
                                            <div className="add-recipe-ingredient-item new">
                                                <input type="number" min="0" placeholder="Ex: 1" className="add-recipe-amount input" value={this.state.amount} onChange={(e) => {this.setState({amount: e.target.value})}}></input>
                                                <input type="text" placeholder="Ex: kg" className="add-recipe-unit input" value={this.state.unit} onChange={(e) => {this.setState({unit: e.target.value})}}></input>
                                                <input type="text" placeholder="Ex: pork" className="add-recipe-ingre-name input" value={this.state.ingreName} onChange={(e) => {this.setState({ingreName: e.target.value})}}></input>
                                                <i className="fa fa-check check" onClick={() => {this.addInput()}}></i>
                                                <i className="fa fa-times remove" onClick={() => {this.removeInput()}}></i>
                                            </div> 
                                        </div>
                                    ) : (
                                        <div id="add-recipe-btn-big" onClick={() => {this.addIngre()}}>
                                            ADD MAIN INGREDIENT
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div id="add-recipe-right-col">
                        <p className="direction-title">{`INSTRUCTION `}
                            <i className="fa fa-cutlery" aria-hidden="true"></i>
                        </p>
                        <DirectionInput updateImage={this.updateImage} updateDirection={this.updateDirection} index={0} time={Date.now()}/>
                        {
                            this.state.directions.map((item, index) => {
                                return (
                                <div key={item.id}>
                                    <DirectionItem img={item.img} 
                                                time={Date.now()}
                                                index={index*2+1}
                                                content={item.content} 
                                                title={item.title} 
                                                kind={item.kind} 
                                                updateImage={this.editImage}
                                                updateContent={this.editDirection}
                                                removeContent={this.removeContent}
                                                removeImg={this.removeImg} />
                                    <DirectionInput index={index*2+2}
                                                time={Date.now()}
                                                updateImage={this.updateImage}
                                                updateDirection={this.updateDirection} />
                                </div>
                            )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        isSignIn: state.isSignIn,
        isShowModal: state.isShowModal
    }
}

export default connect(mapStateToProps)(AddRecipe)