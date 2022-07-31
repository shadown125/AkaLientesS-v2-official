class NavigationMouseMovementModule {
    private readonly navigation: HTMLDivElement
    private readonly menu: HTMLUListElement | null
    private readonly menuItem: NodeListOf<HTMLLIElement>

    private windowWidth = window.innerWidth
    private windowHeight = window.innerHeight

    constructor(element: HTMLDivElement) {
        this.navigation = element
        this.menu = this.navigation.querySelector('ul')
        this.menuItem = this.menu!.querySelectorAll('li')

        this.init()
    }

    private init () {
        window.addEventListener('mousemove', this.mousemove.bind(this), {passive: true})
    }

    private mousemove (event: any) {
        const offsetX = 0.5 - event.clientX / this.windowWidth,
            offsetY = 0.5 - event.clientY / this.windowHeight,
            dy = event.clientY - this.windowHeight / 2,
            dx = event.clientX - this.windowWidth / 2,
            theta = Math.atan2(dy, dx),
            offsetPoster = this.menu!.getAttribute('data-offset') as unknown as number ?? 10,
            transformPoster = `translate3d(0, ${-offsetX * offsetPoster}, 0) rotateX(${-offsetY * offsetPoster}deg) rotateY(${offsetX * (offsetPoster * 2)}deg`

        let angle = theta * 180 / Math.PI - 90

        if (angle < 0) {
            angle = angle + 360
        }

        this.menu!.style.transform = transformPoster

        this.menuItem.forEach((item) => {
            const offsetLayer = item.getAttribute('data-offset') as unknown as number

            item.style.transform = `translate3d(${offsetX * (offsetLayer * 4)}px, ${offsetY * (offsetLayer * 4)}px, 20px)`
        })
    }
}

export default function navigationMouseMovement(element: HTMLDivElement): NavigationMouseMovementModule | null {
    class NavigationMouseMovement extends NavigationMouseMovementModule {}

    if (element === null) return null

    return new NavigationMouseMovement(element)
}
