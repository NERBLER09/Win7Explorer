<div class="window glass">
    <div class="title-bar">
        <div class="title-bar-text"></div>
        <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close"></button>
        </div>
    </div>
    <div class="window-body">
        <slot></slot>
    </div>
</div>

<style>
    .window-body {
        height: calc(100vh - 50px);
    }
</style>