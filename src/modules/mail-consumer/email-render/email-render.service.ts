import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailRenderService {
  private readonly templatesPath = path.join(__dirname, 'templates');
  renderTemplate(templateName: string, data: Record<string, any>): string {
    const templateFile = path.join(this.templatesPath, `${templateName}.hbs`);
    const layoutFile = path.join(this.templatesPath, 'layout.hbs');

    const templateSource = fs.readFileSync(templateFile, 'utf-8');
    const layoutSource = fs.readFileSync(layoutFile, 'utf-8');

    const compiledTemplate = Handlebars.compile(templateSource);
    const compiledLayout = Handlebars.compile(layoutSource);

    const body = compiledTemplate(data);
    const finalHtml = compiledLayout({ ...data, body });
    return finalHtml;
  }
}
