import { Recipe } from './../recipes/recipe.model';
import {Injectable, OnInit} from '@angular/core';
import { Http, Response } from '@angular/http';
import { ShoppingListService } from './shoppingList.service';

import 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {isUndefined} from 'util';


@Injectable()
export class Recipe2Service implements OnInit{


  recipeList: Recipe[] = [];
    recipeListChanged = new Subject();
    dbRecipe: Observable<Recipe[]>;


    constructor(private slService: ShoppingListService,
        public http: Http) {
    }

  ngOnInit(): void {
      this.dbRecipe.subscribe( (res) => {
    });
  }

     getRecipeList() {
        return this.http.get('https://us-central1-recipewebapp-4a3c3.cloudfunctions.net/app/recipes')
            .map(
            (response: Response) => {
              if (!response.json()) {
                return null;
              }
                const recipes = response.json().obj;
                const transformedRecipes: Recipe[] = [];
                let tmpRecipe;
                for (const recipe in recipes) {
                  tmpRecipe = new Recipe(recipe, recipes[recipe].name, recipes[recipe].description, recipes[recipe].imagePath, recipes[recipe].ingredients, recipes[recipe].category);
                  transformedRecipes.push(tmpRecipe);
                }
                this.recipeList = transformedRecipes;
              this.recipeListChanged.next(this.recipeList.slice());
                return transformedRecipes;
            });
    }




    getGroupByCatagory() {
      console.log('get recipe group');
      return this.http.get('https://us-central1-recipewebapp-4a3c3.cloudfunctions.net/app/recipes')
        .map(
          (response: Response) => {
            if (!response.json()) {
              return null;
            }
            const counter: number[] = [];
            const names: string[] = [];
            const groupRecipe: number[] = [];
            const recipes = response.json().obj;
            const transformedRecipes: Recipe[] = [];
            for (const x in recipes) {
              if (isUndefined(groupRecipe[recipes[x].category])) {
                groupRecipe[recipes[x].category] = 0;
              }
              groupRecipe[recipes[x].category]++;
            }
            this.recipeList = transformedRecipes;

            for (const tmp in groupRecipe) {
              counter.push(groupRecipe[tmp]);
              names.push(tmp);
            }


            return {names: names, counts: counter};
          });
    }



    addRecipe(recipe: Recipe) {
        const body = JSON.stringify(recipe);
        return this.http.post('https://us-central1-recipewebapp-4a3c3.cloudfunctions.net/app/recipes', recipe).map(
            (response: Response) => {
                const result = response.json()
                const index = this.recipeList.indexOf(recipe);
                console.log('result: ' + response);
                recipe.id = result.obj.id;
                this.recipeList.push(recipe);
            }
        );
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        newRecipe.id = this.recipeList[index].id;
        this.recipeList[index] = newRecipe;
        this.recipeListChanged.next(this.recipeList.slice());
        return this.http.patch('https://us-central1-recipewebapp-4a3c3.cloudfunctions.net/app/recipes/' + this.recipeList[index].id, newRecipe);
    }

    deleteRecipe(index: number) {
        const tmp =  this.http.delete('https://us-central1-recipewebapp-4a3c3.cloudfunctions.net/app/recipes/' + this.recipeList[index].id);
        this.recipeList.splice(index, 1);
        return tmp;

    }


    getRecipe(index: number) {
            return this.recipeList[index]; // "Slice" is a copy of the array.

    }
    addIngredientsToShoppingList(recipe: Recipe) {
        this.slService.addIngredients(recipe.ingredients);
    }
}
