import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IconService } from './icon.service';

describe('IconService', () => {
  let service: IconService;
  let httpMock: HttpTestingController;

  const MOCK_ICONS = [
    { name: 'alarm' },
    { name: 'arrow-up' },
    { name: 'bootstrap' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(IconService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('icons signal', () => {
    it('should return null initially', () => {
      expect(service.icons()).toBeNull();
    });
  });

  describe('getIconsSync()', () => {
    it('should return empty array when icons not loaded', () => {
      expect(service.getIconsSync()).toEqual([]);
    });

    it('should return icons after loading', () => {
      service.loadIcons().subscribe();
      const req = httpMock.expectOne(
        'https://raw.githubusercontent.com/twbs/icons/main/bootstrap-icons.json',
      );
      req.flush(MOCK_ICONS);

      expect(service.getIconsSync()).toEqual(['alarm', 'arrow-up', 'bootstrap']);
    });
  });

  describe('loadIcons()', () => {
    it('should make HTTP request and map icon names', (done) => {
      service.loadIcons().subscribe(icons => {
        expect(icons).toEqual(['alarm', 'arrow-up', 'bootstrap']);
        done();
      });

      const req = httpMock.expectOne(
        'https://raw.githubusercontent.com/twbs/icons/main/bootstrap-icons.json',
      );
      expect(req.request.method).toBe('GET');
      req.flush(MOCK_ICONS);
    });

    it('should cache icons and not re-request on second call', () => {
      service.loadIcons().subscribe();
      const req = httpMock.expectOne(
        'https://raw.githubusercontent.com/twbs/icons/main/bootstrap-icons.json',
      );
      req.flush(MOCK_ICONS);

      // Second call should NOT make a new HTTP request
      service.loadIcons().subscribe(icons => {
        expect(icons).toEqual(['alarm', 'arrow-up', 'bootstrap']);
      });
      httpMock.expectNone(
        'https://raw.githubusercontent.com/twbs/icons/main/bootstrap-icons.json',
      );
    });

    it('should handle HTTP error gracefully and return empty array', (done) => {
      service.loadIcons().subscribe(icons => {
        expect(icons).toEqual([]);
        done();
      });

      const req = httpMock.expectOne(
        'https://raw.githubusercontent.com/twbs/icons/main/bootstrap-icons.json',
      );
      req.error(new ProgressEvent('error'));
    });

    it('should set icons signal to empty array on error', (done) => {
      service.loadIcons().subscribe(() => {
        expect(service.icons()).toEqual([]);
        done();
      });

      const req = httpMock.expectOne(
        'https://raw.githubusercontent.com/twbs/icons/main/bootstrap-icons.json',
      );
      req.error(new ProgressEvent('error'));
    });

    it('should set icons signal after successful load', (done) => {
      service.loadIcons().subscribe(() => {
        expect(service.icons()).toEqual(['alarm', 'arrow-up', 'bootstrap']);
        done();
      });

      const req = httpMock.expectOne(
        'https://raw.githubusercontent.com/twbs/icons/main/bootstrap-icons.json',
      );
      req.flush(MOCK_ICONS);
    });
  });
});
