import React, { Component } from 'react'
import '../containers/addrecipe.css'

export default class IngredientItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editDisplay: false,
            amount: this.props.recipe.amount,
            unit: this.props.recipe.unit,
            name: this.props.recipe.name
        }
        this.edit = this.edit.bind(this)
        this.remove = this.remove.bind(this)
        this.editDisplay = this.editDisplay.bind(this)
    }

    edit() {
        this.setState({editDisplay : false})
        if (this.props.kind == 0)
            this.props.edit(this.props.idx, {
                amount: this.state.amount,
                unit: this.state.unit,
                name: this.state.name
            })
        else {
            this.props.edit(this.props.idx, {
                amount: this.state.amount,
                unit: this.state.unit,
                name: this.state.name
            }, this.props.partIdx)
        }

    }

    editDisplay() {
            this.setState({editDisplay: true})
    }

    remove() {
        this.setState({editDisplay : false})
        if (this.props.kind == 0) {
            this.props.remove(this.props.idx)
        }
        else {
            this.props.remove(this.props.idx, this.props.partIdx)
        }
    }

    render() {

        const { amount, unit, name } = this.state

        return this.state.editDisplay == true ?
            (
                <div className="add-recipe-ingredient-item">
                    <input type="number" min="0" placeholder="amount" className="add-recipe-amount input" value={amount} onChange={(e) => {this.setState({amount: e.target.value})}}></input>
                    <input type="text" placeholder="unit" className="add-recipe-unit input" value={unit} onChange={(e) => {this.setState({unit: e.target.value})}}></input>
                    <input type="text" placeholder="name" className="add-recipe-ingre-name input" value={name} onChange={(e) => {this.setState({name: e.target.value})}}></input>
                    <i className="fa fa-check check" onClick={() => {this.edit()}}></i>
                    <i className="fa fa-times remove" onClick={() => {this.remove()}}></i>
                </div>
            )
            :
            (
                <div className="add-recipe-ingredient-item">
                    <div className="add-recipe-amount">{amount}</div>
                    <div className="add-recipe-unit">{unit}</div>
                    <div className="add-recipe-ingre-name">{name}</div>
                    <i className="fa fa-pencil edit" onClick={() => {this.editDisplay()}}></i>
                    <i className="fa fa-times delete" onClick={() => this.remove()}></i>
                </div>
            )
    }
}