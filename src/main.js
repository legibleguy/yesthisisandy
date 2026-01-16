import './style.css';
import data from './data.json';

// DOM Elements
const mainVideo = document.getElementById('main-video');
const mainVideoWrapper = document.getElementById('main-video-wrapper');
const caption = document.getElementById('caption');
const backgroundContainer = document.getElementById('background-videos');
const progressContainer = document.getElementById('progress-container');

// State
let currentIndex = 0;
let progressInterval;
let spawnTimeout;
let startTime;
const MAX_BG_VIDEOS = 6;

// Random colors for project links
const projectColors = [
    '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3',
    '#F38181', '#AA96DA', '#FCBAD3', '#A8D8EA',
    '#FF9A8B', '#88D8B0', '#FFAAA5', '#98DDCA'
];

function init() {
    if (!data || data.length === 0) {
        if (caption) caption.textContent = "No data loaded.";
        return;
    }

    // Create progress bars
    if (progressContainer) {
        progressContainer.innerHTML = '';
        data.forEach((_, index) => {
            const barWrapper = document.createElement('div');
            barWrapper.className = 'h-1.5 flex-1 bg-white/30 backdrop-blur-sm rounded-full overflow-hidden';

            const inner = document.createElement('div');
            inner.className = 'progress-fill h-full bg-white w-0';
            inner.id = `progress-${index}`;

            barWrapper.appendChild(inner);
            progressContainer.appendChild(barWrapper);
        });
    }

    // Click navigation on main video
    if (mainVideoWrapper) {
        mainVideoWrapper.addEventListener('click', (e) => {
            const rect = mainVideoWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left;
            if (x < rect.width / 2) {
                prevSection();
            } else {
                nextSection();
            }
        });
    }

    // Apply random colors to project links
    applyRandomColors();

    startSection(0);

    // Initialize the new project section screenshots
    startScreenshotStacking();
}

function applyRandomColors() {
    const links = document.querySelectorAll('.random-color-link');
    const shuffledColors = [...projectColors].sort(() => Math.random() - 0.5);

    links.forEach((link, index) => {
        const color = shuffledColors[index % shuffledColors.length];
        link.style.color = color;
    });
}

function startSection(index) {
    if (index >= data.length) {
        index = 0;
    }
    currentIndex = index;
    const item = data[index];

    // Clear previous state
    clearTimeout(spawnTimeout);
    clearInterval(progressInterval);

    // Clear background videos for clean transition
    if (backgroundContainer) {
        backgroundContainer.innerHTML = '';
    }

    // Update main video
    if (mainVideo) {
        mainVideo.src = item.mainVideo;
        const playPromise = mainVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.warn("Auto-play prevented:", error);
            });
        }
    }

    // Update caption
    if (caption) {
        caption.textContent = item.caption;
    }

    // Update progress bars
    updateProgressBarsStates(index);

    // Start timer
    const duration = item.duration || 10000;
    startTime = Date.now();

    progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        let pct = (elapsed / duration) * 100;
        if (pct > 100) pct = 100;

        const p = document.getElementById(`progress-${index}`);
        if (p) p.style.width = `${pct}%`;

        if (elapsed >= duration) {
            nextSection();
        }
    }, 16);

    // Start spawning background videos
    scheduleNextSpawn();
}

function updateProgressBarsStates(activeIndex) {
    data.forEach((_, i) => {
        const p = document.getElementById(`progress-${i}`);
        if (!p) return;

        if (i < activeIndex) {
            p.style.width = '100%';
            p.style.transition = 'none';
        } else if (i > activeIndex) {
            p.style.width = '0%';
            p.style.transition = 'none';
        } else {
            p.style.width = '0%';
            p.style.transition = 'width 0.1s linear';
        }
    });
}

function nextSection() {
    startSection(currentIndex + 1);
}

function prevSection() {
    if (currentIndex > 0) {
        startSection(currentIndex - 1);
    } else {
        startSection(data.length - 1);
    }
}

function scheduleNextSpawn() {
    const item = data[currentIndex];
    if (!item.backgroundVideos || item.backgroundVideos.length === 0) return;

    const delay = Math.random() * 1700 + 800;

    spawnTimeout = setTimeout(() => {
        spawnVideo();
        scheduleNextSpawn();
    }, delay);
}

let lastVideos = [];

function spawnVideo() {
    const item = data[currentIndex];
    if (!item.backgroundVideos || item.backgroundVideos.length === 0) return;
    if (!backgroundContainer) return;

    // Limit background videos
    if (backgroundContainer.children.length >= MAX_BG_VIDEOS) {
        backgroundContainer.firstElementChild.remove();
    }

    // Pick a video that wasn't among the last used (if possible)
    let availableVideos = item.backgroundVideos.filter(v => !lastVideos.includes(v));
    if (availableVideos.length === 0) {
        availableVideos = item.backgroundVideos;
        lastVideos = [];
    }

    const src = availableVideos[Math.floor(Math.random() * availableVideos.length)];
    lastVideos.push(src);
    if (lastVideos.length > 3) lastVideos.shift();

    // Determine size
    const minW = Math.min(window.innerWidth * 0.12, 180);
    const maxW = Math.min(window.innerWidth * 0.25, 350);
    const width = Math.floor(Math.random() * (maxW - minW) + minW);
    const height = width * (9 / 16);

    // Avoid main container
    const mainRect = mainVideoWrapper ? mainVideoWrapper.getBoundingClientRect() : null;
    const existingRects = Array.from(backgroundContainer.children).map(child => child.getBoundingClientRect());

    let bestX = 0;
    let bestY = 0;
    const ATTEMPTS = 15;
    const OVERLAP_TOLERANCE = 0.2;

    for (let i = 0; i < ATTEMPTS; i++) {
        const x = Math.random() * (window.innerWidth - width);
        const y = Math.random() * (window.innerHeight - height);
        const candidate = { left: x, top: y, right: x + width, bottom: y + height, width, height };

        // Check overlap with main container
        if (mainRect && isOverlapping(candidate, mainRect, 0.4)) continue;

        // Check overlap with existing videos
        let tooMuchOverlap = false;
        for (const rect of existingRects) {
            if (isOverlapping(candidate, rect, OVERLAP_TOLERANCE)) {
                tooMuchOverlap = true;
                break;
            }
        }

        if (!tooMuchOverlap) {
            bestX = x;
            bestY = y;
            break;
        }

        if (i === 0) {
            bestX = x;
            bestY = y;
        }
    }

    const v = document.createElement('video');
    v.src = src;
    v.muted = true;
    v.playsInline = true;
    v.autoplay = true;
    v.loop = true;

    v.style.width = `${width}px`;
    v.style.height = `${height}px`;
    v.className = 'absolute object-cover grayscale-[50%] hover:grayscale-0 transition-all duration-300 rounded-sm';
    v.style.left = `${bestX}px`;
    v.style.top = `${bestY}px`;

    backgroundContainer.appendChild(v);
    v.play().catch(() => { });

    // Remove after lifetime
    const lifetime = Math.random() * 3000 + 4000;
    setTimeout(() => {
        if (v && v.parentNode) {
            v.remove();
        }
    }, lifetime);
}

function isOverlapping(rect1, rect2, tolerance) {
    const overlapX = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
    const overlapY = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));
    const overlapArea = overlapX * overlapY;

    const area1 = rect1.width * rect1.height;
    const area2 = rect2.width * rect2.height;

    return (overlapArea / area1 > tolerance) || (overlapArea / area2 > tolerance);
}

// Initialize when DOM is ready - moved to the bottom

// --- PROJECT SCREENSHOT STACKING LOGIC ---

const screenshotData = {
    mw3: ['Store_GamesPDP_Hero_Secondary02.png', 'Store_GamesPDP_Hero_Secondary04.png'],
    tab: ['IdEmBJ.png', 'lK7DH+.png', 'Ud1pKU.png', 'vjfI03.png', 'wDZRrS.png'],
    tbh: ['16fbl0.png', 'iVuhf_.png', 'JzCNir.png', 'shZu4G.png'],
    hh: ['1.png', '6vWN08.png', 'Q5Ea_J.png', 'XQk1qH.png'],
    jgf: ['9xiuCB.png', 'Vdzv5X.png', 'hkWdpM.png', 'mljpAr.png'],
    kil: ['40l_wB.png', 'aZU46n.png'],
    tws: ['7NA9+9.png', 'LPzKA0.png', 'tGCwEt.png']
};

let lastScreenshotProject = '';

function startScreenshotStacking() {
    const mobileContainer = document.getElementById('mobile-screenshot-stack');
    const desktopContainer = document.getElementById('desktop-screenshot-stack');

    if (!mobileContainer && !desktopContainer) return;

    function spawn() {
        // Pick a random project that isn't the same as the last one
        const projects = Object.keys(screenshotData);
        let project;
        do {
            project = projects[Math.floor(Math.random() * projects.length)];
        } while (project === lastScreenshotProject && projects.length > 1);

        lastScreenshotProject = project;

        const screenshots = screenshotData[project];
        const screenshot = screenshots[Math.floor(Math.random() * screenshots.length)];
        const src = `/media/gamescreenshots/${project}/${screenshot}`;

        [mobileContainer, desktopContainer].forEach(container => {
            if (!container) return;

            const img = document.createElement('img');
            img.src = src;
            // No effects, just appear
            img.className = 'absolute max-w-[80%] max-h-[80%] object-contain';

            // Random offset from center
            const offsetX = (Math.random() - 0.5) * 60; // +/- 30px
            const offsetY = (Math.random() - 0.5) * 60; // +/- 30px

            img.style.left = `calc(50% + ${offsetX}px)`;
            img.style.top = `calc(50% + ${offsetY}px)`;
            img.style.transform = 'translate(-50%, -50%)';
            img.style.zIndex = container.children.length;

            container.appendChild(img);

            // Limit to 5 screenshots, remove the bottom one
            if (container.children.length > 5) {
                container.firstElementChild.remove();
            }
        });

        // Random interval between 1.5s and 3.5s
        const nextDelay = Math.random() * 2000 + 1500;
        setTimeout(spawn, nextDelay);
    }

    spawn();
}

// Initialize when DOM is ready
init();
