let ctx;

export function playSound(type) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
        console.warn('Web Audio API is not supported in this browser.');
        return;
    }

    ctx = ctx || new AudioContextClass();

    const play = () => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const freqs = { x: 520, o: 380, win: 720, draw: 220 };
        const now = ctx.currentTime;

        osc.type = 'sine';
        osc.frequency.value = freqs[type];
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
    };

    if (ctx.state === 'suspended') {
        void ctx.resume().then(play).catch((error) => {
            console.error('Unable to resume audio playback:', error);
        });
        return;
    }

    play();
}
    
