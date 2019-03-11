<template>
  <div id="container">
    <h2>Pick a Category</h2>
    <h3 class="categories-header">SFW Categories</h3>
    <ul class="categories">
      <li v-for="sfw_category in sfwCategories">
        <a class="sfw-categories" :href="sfw_category" @click.prevent="selectCategory">{{ sfw_category }}</a>
      </li>
    </ul>
    <h3 class="categories-header">NSFW Categories</h3>
    <ul class="categories">
      <li v-for="nsfw_category in nsfwCategories">
        <a class="nsfw-categories" :href="nsfw_category" @click.prevent="selectCategory">{{ nsfw_category }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { SFW_SUBREDDITS } from '../sfw_subreddits.js';
import { NSFW_SUBREDDITS } from '../nsfw_subreddits.js';
import { fixCategoryNames } from '../helpers.js';

export default {
  data() {
    return {
      sfwSubreddits: SFW_SUBREDDITS,
      nsfwSubreddits: NSFW_SUBREDDITS,
      currentCategory: '',
      nsfwSwitch: ''
    }
  },
  methods: {
    selectCategory(event) {
      this.nsfwSwitch = event.target.classList[0] == 'sfw-categories' ? false : true;
      this.currentCategory = event.target.textContent;
      this.$emit('category-selected', {
        currentCategory: this.currentCategory,
        nsfwSwitch: this.nsfwSwitch
        });
    }
  },
  computed: {
    sfwCategories() {
      const sfwCategories = [];
      for(const sfwCategory in this.sfwSubreddits) {
        sfwCategories.push(sfwCategory);
      }
      return sfwCategories;
    },
    nsfwCategories() {
      const nsfwCategories = [];
      for(const nsfwCategory in this.nsfwSubreddits) {
        nsfwCategories.push(nsfwCategory);
      }
      return nsfwCategories;
    }
  }
}
</script>

<style scoped>
#container {
  max-width: 900px;
  margin: 0 auto;
}

ul {
  list-style-type: none;
}

li {
  padding: 5px;
  margin: 10px;
}

a {
  text-decoration: none;
  color: black;
  display: inline-block;
  transition: 0.3s all;
}

a:hover {
  color: tomato;
  transform: scale(2);
  transition: 0.3s all;
}
.categories {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.categories-header {
  margin: 60px 0 20px 0;
  color: tomato;
}

</style>
