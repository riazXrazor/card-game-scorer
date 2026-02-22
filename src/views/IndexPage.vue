<template>
  <q-page class="q-pa-md pb-100">
    <div class="q-mb-lg">
      <h1 class="text-h5 text-weight-bolder q-mb-xs q-mt-sm" style="letter-spacing: -0.5px;">Pick a game to play</h1>
    </div>

    <!-- Games List -->
    <div class="q-gutter-y-md q-mb-xl">
      
      <!-- Hajari Card -->
      <q-card class="bg-card text-white overflow-hidden" flat style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.05)">
        <div class="game-image-container relative-position hajari-bg">
        </div>
        <q-card-section class="q-pa-md">
          <h2 class="text-h6 text-weight-bold q-ma-none q-mb-xs">Hajari</h2>
          <p class="text-caption text-grey-5 q-mb-md" style="line-height: 1.4">Classic card game of strategy and high-stakes skill.</p>
          
          <div class="row items-center justify-center">
            <q-btn unelevated color="primary" class="q-px-md q-py-xs" style="border-radius: 8px; font-weight: 600" to="/hajari" no-caps>
              Play Now <q-icon name="play_arrow" size="18px" class="q-ml-xs" />
            </q-btn>
          </div>
        </q-card-section>
      </q-card>

      <!-- Fish Card -->
      <q-card class="bg-card text-white overflow-hidden" flat style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.05)">
        <div class="game-image-container relative-position fish-bg">
        </div>
        <q-card-section class="q-pa-md">
          <h2 class="text-h6 text-weight-bold q-ma-none q-mb-xs">Fish</h2>
          <p class="text-caption text-grey-5 q-mb-md" style="line-height: 1.4">The ultimate fast-paced card matching tournament.</p>
          
          <div class="row items-center justify-center">
            <q-btn unelevated color="primary" class="q-px-md q-py-xs" style="border-radius: 8px; font-weight: 600" to="/fish" no-caps>
              Play Now <q-icon name="play_arrow" size="18px" class="q-ml-xs" />
            </q-btn>
          </div>
        </q-card-section>
      </q-card>

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
