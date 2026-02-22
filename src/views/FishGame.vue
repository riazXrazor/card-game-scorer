<template>
  <q-page class="q-pa-md pb-120">
    <!-- Game Progress -->
    <div class="q-mb-md">
      <div class="row justify-between items-center text-caption text-weight-bold text-grey-5 q-mb-sm text-uppercase" style="letter-spacing: 0.5px">
        <span>Game Progress</span>
        <span class="text-primary">Round {{ currentRound }} of {{ totalRounds }}</span>
      </div>
      <q-linear-progress :value="currentRound / totalRounds" color="primary" track-color="dark-lighter" size="4px" />
    </div>

    <!-- Player Totals -->
    <div class="row q-col-gutter-sm q-mb-lg">
      <div class="col-3" v-for="(player, index) in players" :key="'p'+index">
        <q-card class="bg-card q-py-sm q-px-xs text-center border-radius-lg" flat bordered style="border-color: rgba(255,255,255,0.05)">
          <div class="text-caption text-weight-bold text-grey-5">{{ player.initial }}</div>
          <div class="text-h6 text-weight-bolder" :class="index === 0 ? 'text-primary' : 'text-grey-3'">{{ getTotal(index) }}</div>
        </q-card>
      </div>
    </div>

    <!-- Score Table -->
    <div class="full-width q-mt-lg">
      <div class="row text-caption text-weight-bold text-grey-5 q-mb-md text-center" style="letter-spacing: 0.5px">
        <div class="col-2 text-left">ROUND</div>
        <div class="col-2 offset-1">P1</div>
        <div class="col-2">P2</div>
        <div class="col-2">P3</div>
        <div class="col-2">P4</div>
      </div>

      <div class="q-gutter-y-sm">
        <!-- Past and Current Rounds -->
        <div v-for="roundNum in totalRounds" :key="'r'+roundNum" 
             class="row items-center text-center q-py-sm border-radius-lg relative-position"
             :class="{'current-round-highlight': roundNum === currentRound, 'q-px-sm': roundNum === currentRound}">
             
          <div class="col-2 text-left text-weight-bold" :class="roundNum === currentRound ? 'text-primary' : (roundNum > currentRound ? 'text-grey-7' : 'text-grey-5')">
            {{ roundNum }}
          </div>
          
          <div class="col-10 row justify-around">
            <template v-if="roundNum < currentRound">
              <div class="col-2 text-weight-bold text-grey-3" v-for="(player, pIndex) in players" :key="'rs'+pIndex">
                {{ getScore(roundNum, pIndex) }}
              </div>
            </template>
            
            <template v-else-if="roundNum === currentRound">
              <div class="col-2" v-for="(player, pIndex) in players" :key="'ri'+pIndex">
                <q-input 
                  v-model.number="currentInput[pIndex]" 
                  type="number" 
                  dense 
                  outlined 
                  dark 
                  class="score-input"
                  bg-color="transparent"
                  input-class="text-center text-weight-bold"
                />
              </div>
            </template>
            
            <template v-else>
               <div class="col-2" v-for="(player, pIndex) in players" :key="'re'+pIndex">
                <div class="empty-score-box"></div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Fixed Bottom Actions -->
    <div class="fixed-bottom q-pa-md row items-center no-wrap z-max" style="bottom: 60px;">
      <q-btn 
        unelevated 
        color="primary" 
        class="col q-py-sm q-mr-sm text-weight-bold" 
        style="border-radius: 12px; font-size: 1.05rem;"
      >
        <q-icon name="save" size="xs" class="q-mr-sm" />
        Save Round {{ currentRound }}
      </q-btn>
      <q-btn 
        fab
        color="primary" 
        icon="add"
        class="shadow-10"
        style="border-radius: 50%;"
      />
    </div>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const totalRounds = 6 // Showing 6 based on SC, total is 8 but typically scrollable
const currentRound = ref(3)

const players = ref([
  { initial: 'P1' },
  { initial: 'P2' },
  { initial: 'P3' },
  { initial: 'P4' }
])

// Mock historical scores
const historicalScores = ref([
  [45, 32, 50, 28], // Round 1
  [62, 41, 35, 44]  // Round 2
])

// Current round inputs
const currentInput = ref([35, 0, 0, 0]) // P1 has 35 already entered as per SS

const getScore = (round, playerIndex) => {
  if (round - 1 < historicalScores.value.length) {
    return historicalScores.value[round - 1][playerIndex]
  }
  return ''
}

const getTotal = (playerIndex) => {
  let total = historicalScores.value.reduce((acc, roundScores) => acc + roundScores[playerIndex], 0)
  if (currentRound.value > historicalScores.value.length) {
     total += (currentInput.value[playerIndex] || 0)
  }
  return total
}
</script>

<style scoped>
.pb-120 { padding-bottom: 120px; }
.bg-card { background-color: #171c26 !important; }
.bg-dark-lighter { background-color: #1a2235 !important; }
.border-radius-lg { border-radius: 12px; }

.current-round-highlight {
  background-color: rgba(29, 78, 216, 0.1);
  border: 1px solid rgba(29, 78, 216, 0.3);
  margin-left: -8px;
  margin-right: -8px;
}

.score-input :deep(.q-field__control) {
  border-radius: 8px;
  height: 38px;
  border-color: rgba(255,255,255,0.1);
}

.empty-score-box {
  height: 38px;
  width: 100%;
  border-radius: 8px;
  border: 1px dashed rgba(255,255,255,0.1);
}
</style>
