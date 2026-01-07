import { Component, signal, viewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  DcxNgAccordionComponent, 
  DcxNgAccordionItem, 
  AccordionTransition 
} from '@dcx-ng-components/dcx-ng-lib';
import { DcxNgButtonComponent } from '@dcx-ng-components/dcx-ng-lib';

@Component({
  selector: 'dcx-ng-accordion-page',
  standalone: true,
  imports: [CommonModule, DcxNgAccordionComponent, DcxNgButtonComponent],
  templateUrl: './dcx-ng-page-accordion.component.html',
  styleUrl: './dcx-ng-page-accordion.component.scss',
})
export class DcxNgPageAccordionComponent {
  // Signals for state management
  selectedTransition = signal<AccordionTransition>('smooth');
  closeOthersEnabled = signal<boolean>(true);
  lastAction = signal<string>('');

  // Basic accordion items
  basicItems: DcxNgAccordionItem[] = [
    {
      id: 'basic-1',
      title: 'What is an Accordion?',
      content: 'An accordion is a vertically stacked list of headers that can be clicked to reveal or hide content associated with them. It is one of the most popular UI components.',
    },
    {
      id: 'basic-2',
      title: 'When to use an Accordion?',
      content: 'Use an accordion when you have multiple sections of content and want to allow users to show/hide them independently. This is useful for FAQs, settings panels, or any grouped content.',
    },
    {
      id: 'basic-3',
      title: 'Accessibility Considerations',
      content: 'Accordions should be keyboard accessible, have proper ARIA attributes, and provide visual feedback for focus states. This component implements all these best practices.',
    },
  ];

  // Items with icons
  itemsWithIcons: DcxNgAccordionItem[] = [
    {
      id: 'icon-1',
      title: 'User Profile',
      icon: 'person-fill',
      content: 'Manage your personal information, avatar, and public profile settings.',
    },
    {
      id: 'icon-2',
      title: 'Notifications',
      icon: 'bell-fill',
      content: 'Configure how and when you receive notifications from the application.',
    },
    {
      id: 'icon-3',
      title: 'Security & Privacy',
      icon: 'shield-lock-fill',
      content: 'Update your password, enable two-factor authentication, and manage privacy settings.',
    },
    {
      id: 'icon-4',
      title: 'Appearance',
      icon: 'palette-fill',
      content: 'Customize the look and feel of the application with themes and display options.',
    },
  ];

  // Items with disabled states
  itemsWithDisabled: DcxNgAccordionItem[] = [
    {
      id: 'disabled-1',
      title: 'Available Content',
      content: 'This section is fully available and can be expanded normally.',
    },
    {
      id: 'disabled-2',
      title: 'Disabled Item',
      content: 'This content should not be visible because the entire item is disabled.',
      disabled: true,
    },
    {
      id: 'disabled-3',
      title: 'Disabled Content Only',
      content: 'This section can be opened, but the content itself is disabled and appears grayed out.',
      disabledContent: true,
    },
  ];

  // Programmatic control items
  controlledItems: DcxNgAccordionItem[] = [
    {
      id: 'ctrl-1',
      title: 'Section 1',
      content: 'This is the content of section 1. You can open this programmatically using the buttons above.',
    },
    {
      id: 'ctrl-2',
      title: 'Section 2',
      content: 'This is the content of section 2. Try using the numbered buttons to control which section is open.',
    },
    {
      id: 'ctrl-3',
      title: 'Section 3',
      content: 'This is the content of section 3. You can also expand multiple sections if "Close Others" is disabled.',
    },
  ];

  // Reference to controlled accordion
  controlledAccordion = viewChild<DcxNgAccordionComponent>('controlledAccordion');

  // Event handlers
  onItemToggled(item: DcxNgAccordionItem, section: string): void {
    this.lastAction.set(`${section}: Toggled "${item.title}"`);
  }

  onItemExpanded(item: DcxNgAccordionItem, section: string): void {
    this.lastAction.set(`${section}: Expanded "${item.title}"`);
  }

  onItemCollapsed(item: DcxNgAccordionItem, section: string): void {
    this.lastAction.set(`${section}: Collapsed "${item.title}"`);
  }

  // Programmatic controls
  openSection(index: number): void {
    const accordion = this.controlledAccordion();
    if (accordion) {
      const itemId = `ctrl-${index + 1}`;
      accordion.expandItemById(itemId);
      this.lastAction.set(`Programmatically opened Section ${index + 1}`);
    }
  }

  closeSection(index: number): void {
    const accordion = this.controlledAccordion();
    if (accordion) {
      const itemId = `ctrl-${index + 1}`;
      accordion.collapseItemById(itemId);
      this.lastAction.set(`Programmatically closed Section ${index + 1}`);
    }
  }

  toggleTransition(): void {
    const transitions: AccordionTransition[] = ['smooth', 'fast', 'slow', 'none'];
    const currentIndex = transitions.indexOf(this.selectedTransition());
    const nextIndex = (currentIndex + 1) % transitions.length;
    this.selectedTransition.set(transitions[nextIndex]);
  }

  toggleCloseOthers(): void {
    this.closeOthersEnabled.update(value => !value);
  }
}
