import IRoom from "../../IRoom";
import Tile from "../../tiles/Tile";
import HoverTile from "../../tiles/HoverTile";

export default class TilesContainer extends Phaser.GameObjects.Container {
	private readonly room: IRoom
	private readonly tiles: Tile[]
	private readonly hoverTile: HoverTile

	public constructor(room: IRoom) {
		super(room)

		this.room = room

		this.tiles = this.getTilesFromMap()

		this.hoverTile = new HoverTile(room)
		this.hoverTile.setVisible(false)

		this.add(this.tiles)
		this.add(this.hoverTile)

	}

	private getTilesFromMap(): Tile[] {
		const tiles: Tile[] = []

		for (const mapTile of this.room.map.tilePositions) {
			if (mapTile.height === -1)
				continue

			const tile = new Tile(this.room, mapTile)
			this.setTileEvents(tile)

			tiles.push(tile)
		}

		return tiles
	}

	private setTileEvents(tile: Tile): void {
		tile.on('pointerover', (): void => this.onTileHover(tile))
		tile.on('pointerout', (): void => this.onTileOut(tile))
	}

	private onTileHover(tile: Tile): void {
		this.hoverTile.setVisible(true)
		this.hoverTile.setHoverTilePosition(tile.heightMapPosition)
	}

	private onTileOut(tile: Tile): void {

	}
}
