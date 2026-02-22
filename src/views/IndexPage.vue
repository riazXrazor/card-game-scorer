<template>
  <q-page class="q-pa-md pb-100">
    <div class="q-mb-lg">
      <h1 class="text-h5 text-weight-bolder q-mb-xs q-mt-sm" style="letter-spacing: -0.5px;">Pick a game to play</h1>
      <p class="text-caption text-grey-5" style="line-height: 1.4; font-size: 0.85rem;">Select one of our popular card games to start your session.</p>
    </div>

    <!-- Games List -->
    <div class="q-gutter-y-md q-mb-xl">
      
      <!-- Hajari Card -->
      <q-card class="bg-card text-white overflow-hidden" flat style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.05)">
        <div class="game-image-container relative-position hajari-bg">
          <div class="absolute-bottom-left q-pa-sm z-max">
            <q-badge color="primary" class="text-weight-bold" style="background: rgba(29, 78, 216, 0.5) !important; border-radius: 4px; padding: 4px 8px; font-size: 0.65rem; letter-spacing: 0.5px">STRATEGY</q-badge>
          </div>
        </div>
        <q-card-section class="q-pa-md">
          <h2 class="text-h6 text-weight-bold q-ma-none q-mb-xs">Hajari</h2>
          <p class="text-caption text-grey-5 q-mb-md" style="line-height: 1.4">Classic card game of strategy and high-stakes skill.</p>
          
          <div class="row items-center justify-between">
            <div class="flex items-center text-accent text-caption text-weight-medium">
              <q-icon name="group" size="xs" class="q-mr-xs text-positive" />
              <span class="text-grey-5">1.2k active</span>
            </div>
            <q-btn unelevated color="primary" class="q-px-md q-py-xs" style="border-radius: 8px; font-weight: 600" to="/hajari" no-caps>
              Play Now <q-icon name="play_arrow" size="18px" class="q-ml-xs" />
            </q-btn>
          </div>
        </q-card-section>
      </q-card>

      <!-- Fish Card -->
      <q-card class="bg-card text-white overflow-hidden" flat style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.05)">
        <div class="game-image-container relative-position fish-bg">
          <div class="absolute-bottom-left q-pa-sm z-max">
             <q-badge color="primary" class="text-weight-bold" style="background: rgba(29, 78, 216, 0.5) !important; border-radius: 4px; padding: 4px 8px; font-size: 0.65rem; letter-spacing: 0.5px">FAST-PACED</q-badge>
          </div>
        </div>
        <q-card-section class="q-pa-md">
          <h2 class="text-h6 text-weight-bold q-ma-none q-mb-xs">Fish</h2>
          <p class="text-caption text-grey-5 q-mb-md" style="line-height: 1.4">The ultimate fast-paced card matching tournament.</p>
          
          <div class="row items-center justify-between">
             <div class="flex items-center text-accent text-caption text-weight-medium">
              <q-icon name="group" size="xs" class="q-mr-xs text-positive" />
              <span class="text-grey-5">850 active</span>
            </div>
            <q-btn unelevated color="primary" class="q-px-md q-py-xs" style="border-radius: 8px; font-weight: 600" to="/fish" no-caps>
              Play Now <q-icon name="play_arrow" size="18px" class="q-ml-xs" />
            </q-btn>
          </div>
        </q-card-section>
      </q-card>

    </div>

    <!-- Stats Grid -->
    <div class="row q-col-gutter-md q-mb-xl">
      <div class="col-6">
        <q-card class="bg-card q-pa-md" flat style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.05)">
          <div class="text-uppercase text-grey-5 text-weight-bold text-caption q-mb-sm" style="font-size: 0.65rem; letter-spacing: 0.5px">Your Ranking</div>
          <div class="text-h5 text-weight-bolder">#42</div>
        </q-card>
      </div>
       <div class="col-6">
        <q-card class="bg-card q-pa-md" flat style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.05)">
          <div class="text-uppercase text-grey-5 text-weight-bold text-caption q-mb-sm" style="font-size: 0.65rem; letter-spacing: 0.5px">Total Wins</div>
          <div class="text-h5 text-weight-bolder">128</div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.pb-100 { padding-bottom: 100px; }
.bg-card { background-color: #171c26 !important; }

.game-image-container {
  height: 160px;
  background-size: cover;
  background-position: center;
}

/* CSS fallbacks simulating the images for the PWA showcase */
.hajari-bg {
  background-image: linear-gradient(to bottom, rgba(0,0,0,0) 60%, #171c26), url('https://images.unsplash.com/photo-1541812678822-799ff6dbab57?auto=format&fit=crop&q=80&w=800');
}

.fish-bg {
  background-image: linear-gradient(to bottom, rgba(0,0,0,0) 60%, #171c26), url('https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&q=80&w=800');
}
</style>
