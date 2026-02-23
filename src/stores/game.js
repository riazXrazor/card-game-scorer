import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
    state: () => ({
        currentGame: null, // 'fish' or 'hajari'
        players: [
            { id: 1, name: 'Player 1', initial: 'P1' },
            { id: 2, name: 'Player 2', initial: 'P2' },
            { id: 3, name: 'Player 3', initial: 'P3' },
            { id: 4, name: 'Player 4', initial: 'P4' }
        ],
        rounds: [], // Array of objects mapping playerId to score: { roundNum: 1, scores: { 1: 45, 2: 32, 3: 50, 4: 28 } }
        winnerId: null,
    }),

    getters: {
        totalScores: (state) => {
            const totals = { 1: 0, 2: 0, 3: 0, 4: 0 }
            state.rounds.forEach(round => {
                Object.keys(round.scores).forEach(playerId => {
                    totals[playerId] += round.scores[playerId]
                })
            })
            return totals
        },

        currentRoundNum: (state) => state.rounds.length + 1,

        // For Hajari specifically
        leaderboard: (state) => {
            const totals = { 1: 0, 2: 0, 3: 0, 4: 0 }
            state.rounds.forEach(round => {
                Object.keys(round.scores).forEach(playerId => {
                    totals[playerId] += round.scores[playerId]
                })
            })

            return state.players
                .map(p => ({
                    ...p,
                    score: totals[p.id]
                }))
                .sort((a, b) => b.score - a.score)
        }
    },

    actions: {
        startGame(gameType) {
            if (this.currentGame === gameType && this.rounds.length > 0 && !this.winnerId) {
                // Game already in progress, don't reset unless explicitly asked
                return;
            }
            this.currentGame = gameType
            this.rounds = []
            this.winnerId = null
        },

        saveRound(scoresArray) { // expects [p1Score, p2Score, p3Score, p4Score]
            if (this.winnerId) return // Game is over

            const currentRound = this.rounds.length + 1

            this.rounds.push({
                roundNum: currentRound,
                scores: {
                    1: scoresArray[0] || 0,
                    2: scoresArray[1] || 0,
                    3: scoresArray[2] || 0,
                    4: scoresArray[3] || 0
                }
            })

            this.checkWinCondition()
        },

        checkWinCondition() {
            if (this.currentGame === 'fish') {
                // Fish ends after exactly 8 rounds
                if (this.rounds.length >= 8) {
                    this.determineWinnerByHighestScore()
                }
            } else if (this.currentGame === 'hajari') {
                // Hajari ends when someone hits 1000
                const totals = this.totalScores
                let highestScore = 0
                let potentialWinner = null

                Object.entries(totals).forEach(([playerId, score]) => {
                    if (score >= 1000 && score > highestScore) {
                        highestScore = score
                        potentialWinner = Number(playerId)
                    }
                })

                if (potentialWinner) {
                    this.winnerId = potentialWinner
                }
            }
        },

        determineWinnerByHighestScore() {
            const totals = this.totalScores
            let highestScore = -1
            let winner = null

            Object.entries(totals).forEach(([playerId, score]) => {
                if (score > highestScore) {
                    highestScore = score
                    winner = Number(playerId)
                }
            })

            this.winnerId = winner
        },

        endSession() {
            if (confirm('Are you sure you want to end this game session?')) {
                this.currentGame = null
                this.rounds = []
                this.winnerId = null
            }
        }
    }
})
