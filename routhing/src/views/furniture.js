import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyFurniture } from '../api/dataService.js';
import { itemTemplate } from './item.js';

const myTemplate = (data) => html`
<div class="row space-top">
            <div class="col-md-12">
                <h1>My Furniture</h1>
                <p>This is a list of your publications.</p>
            </div>
        </div>
        <div class="row space-top">
            ${data.map(itemTemplate)}
        </div>
`;

export async function myPage(ctx) {
    const data = await getMyFurniture();
    ctx.render(myTemplate(data));
}