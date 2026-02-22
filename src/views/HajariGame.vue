<template>
  <q-page class="q-pa-md pb-120">
    
    <!-- Leaderboard Header -->
    <div class="row items-center justify-between q-mb-md">
      <div class="text-caption text-weight-bold text-grey-5 text-uppercase" style="letter-spacing: 1px">Leaderboard</div>
      <q-badge color="primary" class="text-weight-bold q-px-sm" style="background: rgba(29, 78, 216, 0.2) !important; color: #60a5fa !important;">Goal: 1000</q-badge>
    </div>

    <!-- Player Cards -->
    <div class="q-gutter-y-md q-mb-xl">
      <q-card v-for="(player, index) in sortedLeaderboard" :key="player.id" class="bg-card border-radius-lg q-pa-md" flat bordered style="border-color: rgba(255,255,255,0.05)">
        <div class="row justify-between q-mb-sm">
          <div>
             <div class="text-h6 text-weight-bold row items-center" :class="index === 0 ? 'text-white' : 'text-grey-4'">
              {{ player.name }}
              <q-icon v-if="gameStore.winnerId === player.id" name="emoji_events" color="warning" size="xs" class="q-ml-sm" />
             </div>
             <div class="text-caption text-grey-5" v-if="gameStore.winnerId === player.id">Winner!</div>
             <div class="text-caption text-grey-5" v-else-if="index === 0 && gameStore.rounds.length > 0">Current Lead</div>
             <div class="text-caption text-grey-5" v-else-if="gameStore.rounds.length > 0">Trailing</div>
             <div class="text-caption text-grey-5" v-else>Waiting for Round 1</div>
          </div>
          <div class="text-right">
             <div class="text-h5 text-weight-bolder" :class="index === 0 ? 'text-primary' : 'text-white'">{{ player.score }}</div>
             <div class="text-caption text-grey-5">/ 1000</div>
          </div>
        </div>
        
        <q-linear-progress :value="player.score / 1000" :color="index === 0 ? 'primary' : 'grey-7'" track-color="dark-lighter" size="8px" style="border-radius: 4px" class="q-mt-md q-mb-sm" />
        
        <div class="row justify-between text-caption text-weight-bold text-uppercase" style="font-size: 0.65rem">
          <span class="text-grey-5">{{ Math.min(Math.round((player.score / 1000) * 100), 100) }}% Complete</span>
          <span class="text-grey-3" v-if="player.score < 1000">{{ 1000 - player.score }} To Win</span>
          <span class="text-warning" v-else>Goal Reached</span>
        </div>
      </q-card>
    </div>

    <!-- Round Entry Area -->
    <div class="q-mb-xl" v-if="!gameStore.winnerId">
      <div class="row items-center justify-between q-mb-md">
        <div class="text-caption text-weight-bold text-grey-5 text-uppercase" style="letter-spacing: 1px">Enter Round {{ gameStore.rounds.length + 1 }}</div>
      </div>
      <div class="row q-col-gutter-sm">
        <div class="col-3" v-for="player in gameStore.players" :key="'rc'+player.id">
           <q-input 
            v-model.number="currentInput[player.id]" 
            type="number" 
            dense 
            outlined 
            dark 
            class="score-input"
            bg-color="transparent"
            input-class="text-center text-weight-bold"
            :label="player.initial"
          />
        </div>
      </div>
      <q-btn 
        unelevated 
        color="primary" 
        class="full-width q-mt-md q-py-sm text-weight-bold" 
        style="border-radius: 12px; font-size: 1.05rem;"
        @click="saveRound"
      >
        <q-icon name="save" size="xs" class="q-mr-sm" />
        Save Round {{ gameStore.rounds.length + 1 }}
      </q-btn>
    </div>
    <div class="q-mb-xl" v-else>
      <q-btn 
        unelevated 
        color="positive" 
        class="full-width q-mt-md q-py-sm text-weight-bold" 
        style="border-radius: 12px; font-size: 1.05rem;"
        @click="resetGame"
      >
        <q-icon name="refresh" size="xs" class="q-mr-sm" />
        Start New Game
      </q-btn>
    </div>

    <!-- History Table -->
    <q-card class="bg-card border-radius-lg overflow-hidden" flat style="border: 1px solid rgba(255,255,255,0.05)" v-if="gameStore.rounds.length > 0">
       <div class="q-pa-md text-caption text-weight-bold text-grey-5 text-uppercase" style="letter-spacing: 1px">Round History</div>
      <table class="full-width history-table">
        <thead>
          <tr class="text-left text-grey-5 text-caption text-weight-bold">
            <th class="q-pa-md">ROUND</th>
            <th class="q-pa-md" v-for="player in gameStore.players" :key="'th'+player.id">{{ player.initial }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="round in [...gameStore.rounds].reverse()" :key="round.roundNum" class="text-caption text-weight-bolder">
            <td class="q-pa-md text-grey-5 text-italic">R {{ round.roundNum }}</td>
            <td class="q-pa-md" v-for="player in gameStore.players" :key="'td'+player.id" :class="round.scores[player.id] > 0 ? 'text-white' : 'text-grey-6'">
              +{{ round.scores[player.id] }}
            </td>
          </tr>
        </tbody>
      </table>
    </q-card>

  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useGameStore } from '../store/game'

const gameStore = useGameStore()

onMounted(() => {
  gameStore.startGame('hajari')
})

const currentInput = ref({
  1: 0,
  2: 0,
  3: 0,
  4: 0
})

const sortedLeaderboard = computed(() => {
  // Sort leaderboard but keep stable identity
  return [...gameStore.leaderboard]
})

const saveRound = () => {
  gameStore.saveRound([
    currentInput.value[1],
    currentInput.value[2],
    currentInput.value[3],
    currentInput.value[4]
  ])

  currentInput.value = { 1: 0, 2: 0, 3: 0, 4: 0 }
}

const resetGame = () => {
  gameStore.currentGame = null
  gameStore.startGame('hajari')
}
</script>

<style scoped>
.pb-120 { padding-bottom: 120px; }
.bg-card { background-color: #171c26 !important; }
.bg-dark-lighter { background-color: #21293a !important; }
.border-radius-lg { border-radius: 12px; }

.history-table { border-collapse: collapse; }
.history-table th, .history-table td {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.75rem;
}
.history-table tbody tr:last-child td {
  border-bottom: none;
}
.score-input :deep(.q-field__control) {
  border-radius: 8px;
  height: 48px;
  border-color: rgba(255,255,255,0.1);
}
</style>
