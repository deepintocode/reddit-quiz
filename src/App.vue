<template>
  <div id="app">
    <app-header></app-header>
    <app-categories
      v-if="!gameIsPlaying && !gameHasFinished"
      @category-selected="categorySelected">
    </app-categories>
    <app-question 
      :currentCategory="currentCategory"
      :currentCategorySubreddits="currentCategorySubreddits"
      :gameIsPlaying="gameIsPlaying"
      @quitToMenu="quitToMenu"
      @gameShouldStop="gameShouldStop">
    </app-question>
    <app-result 
      v-if="gameHasFinished"
      :playerScore="playerScore"
      @quitToMenu="quitToMenu"
    ></app-result>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Categories from './components/Categories.vue';
import Question from './components/Question.vue';
import Result from './components/Result.vue';
import { SFW_SUBREDDITS } from './sfw_subreddits.js';
import { NSFW_SUBREDDITS } from './nsfw_subreddits.js';

export default {
  data() {
    return {
      gameIsPlaying: false,
      currentCategory: '',
      nsfw: false,
      currentCategorySubreddits: [],
      playerScore: 0,
      gameHasFinished: false
    }
  },
  components: {
    appHeader: Header,
    appCategories: Categories,
    appQuestion: Question,
    appResult: Result
  },
  methods: {
    categorySelected($event) {
      this.currentCategory = $event.currentCategory;
      this.nsfw = $event.nsfwSwitch;
      
      if(this.nsfw) {
        this.currentCategorySubreddits = NSFW_SUBREDDITS[this.currentCategory]
      } else {
        this.currentCategorySubreddits = SFW_SUBREDDITS[this.currentCategory]
      }
      console.log(this.currentCategorySubreddits)
      this.gameIsPlaying = true;
    },
    gameShouldStop($event) {
      this.gameIsPlaying = false;
      this.playerScore = $event.playerScore;
      this.gameHasFinished = $event.gameHasFinished;
    },
    quitToMenu() {
      this.gameIsPlaying = false;
      this.gameHasFinished = false;
    }
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  margin: 0 auto;
  text-align: center;
}
</style>
