<template>
  <div id="question">
    <div v-if="gameIsPlaying">
      <p>You have selected the '{{ currentCategory}}' category</p>
      <hr>
      <h3>Which subreddit is this post from?</h3>
      <br>
      <div v-if="fetchedData">
        <a :href="correctSubredditData.url"><p>{{ correctSubredditData.title }}</p></a>
        <br>
        <ul>
          <li v-for="subreddit in randomSubreddits">
            <a @click.prevent="selectAnswer">{{ subreddit }}</a>
          </li>
        </ul>
        <br><br>
        <p>{{ correctSubredditData.num_comments }} {{numOfComments}}</p>
        <a :href="'https://reddit.com' + correctSubredditData.permalink" target="_blank">Permalink</a>
      </div>
    <div id="spinner" v-else></div>
    <br>
    <p>Question {{ questionsAnswered }} of 10</p>
    <p>Correct Answers: {{ playerScore}}</p>
    <br>
    <button @click="quitToMenu">Quit to Main Menu</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      correctSubredditData: [],
      correctSubreddit: "",
      randomSubreddits: [],
      questionsAnswered: 0,
      gameHasFinished: false,
      playerScore: 0,
      fetchedData: false
    };
  },
  props: {
    currentCategory: String,
    currentCategorySubreddits: Array,
    gameIsPlaying: Boolean
  },
  methods: {
    getRandomPost() {
      this.randomSubreddits = [];
      // Create an array of 4 unique random subreddits from the selected category
      while (this.randomSubreddits.length < 4) {
        const randomSubreddit = this.currentCategorySubreddits[
          Math.floor(Math.random() * this.currentCategorySubreddits.length)
        ];
        if (this.randomSubreddits.indexOf(randomSubreddit) === -1) {
          this.randomSubreddits.push(randomSubreddit);
        }
      }
      // Pick the answer from the array of subreddits
      this.correctSubreddit = this.randomSubreddits[
        Math.floor(Math.random() * this.randomSubreddits.length)
      ];
      console.log(this.correctSubreddit);
      fetch(
        `https://stark-cliffs-99202.herokuapp.com/${this.correctSubreddit.slice(
          3
        )}`
      )
        .then(res => res.json())
        .then(data => {
          this.correctSubredditData = data[0].data.children[0].data;
          this.fetchedData = true;
        })
        .catch(err => {
          this.getRandomPost();
        });
      this.fetchedData = false;
    },
    selectAnswer($event) {
      console.log($event.target.textContent);
      console.log(this.correctSubreddit);
      if ($event.target.textContent === this.correctSubreddit) {
        this.playerScore++;
        this.getRandomPost();
      } else {
        this.getRandomPost();
      }
      this.questionsAnswered++;
      console.log(this.playerScore);
    },
    quitToMenu() {
      this.questionsAnswered = 0;
      this.playerScore = 0;
      this.$emit("quitToMenu");
    }
  },
  watch: {
    gameIsPlaying: function(val) {
      if (val) {
        this.getRandomPost();
      }
    },
    questionsAnswered: function(val) {
      if (val > 9) {
        this.gameHasFinished = true;
        this.$emit("gameShouldStop", {
          playerScore: this.playerScore,
          gameHasFinished: this.gameHasFinished
        });
        this.questionsAnswered = 0;
        this.playerScore = 0;
      }
    }
  },
  computed: {
    numOfComments() {
      return this.correctSubredditData.num_comments > 1 ? 'comments' : 'comment'; 
    }
  }
};
</script>

<style scoped>
#question {
  position: relative;
}

li {
  margin: 10px 0;
}

li a {
  cursor: pointer;
  padding: 10px;
  transition: background-color 0.1s linear;
}

li a:hover {
  background-color: tomato;
  transition: background-color 0.3s linear;
}

#spinner { 
  position: relative;
  margin-bottom: 30px;
}
#spinner::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  margin-left: -15px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 3px solid lightgray;
  border-top-color: tomato;
  animation: spinner 0.8s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
</style>
