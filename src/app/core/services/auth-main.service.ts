import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {Subject} from 'rxjs/internal/Subject';

import {config} from '../configs/dev-endpoint.config';

import {UserTokensDto} from '../dto/user-tokens.dto';
import {FileService} from './file.service';
import {RegisterDto} from '../dto';

@Injectable({providedIn: 'root'})
export class AuthMainService {
  public authenticationObserver = new Subject();

  private tokenReference = 'userTokens';

  constructor(
    private http: HttpClient,
    private fileService: FileService,
    private router: Router
  ) {}

  public notifyAboutAuthentication(isAuthenticated: boolean): void {
    this.authenticationObserver.next(isAuthenticated);
  }

  public watchAuthentication(): Observable<any> {
    return this.authenticationObserver.asObservable();
  }

  public login(email: string, password: string): Observable<string> {
    const url = `${config.apiUrl}/api/login`;
    const reqBody = {
      email: email,
      password: password
    };
    return this.http.post<any>(url, reqBody)
      .pipe(map(t => {
        if (t && t.token) {
          AuthMainService.setToken(t);
        }

        return t;
      }));
  }

  public register(regData: RegisterDto, img: File): Observable<Response> {
      const url = `${config.apiUrl}/api/register`;
      const reqBody = {
          email: regData.email,
          password: regData.password,
      };

      return this.http.post<any>(url, reqBody)
          .pipe(tap(t => {
              if (t && t.token) {
                  AuthMainService.setToken(t);
              }
          }), tap(() => {
              this.fileService.uploadFile(img).subscribe();
          }));
  }

  public socialSetToken(t: string) {
      AuthMainService.setToken(t);
  }

  public logout(): void {
    this.notifyAboutAuthentication(false);
    this.router.navigateByUrl(`/auth/login`);
    this.removeToken();
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  public getToken(): UserTokensDto {
    return JSON.parse(localStorage.getItem(this.tokenReference));
  }

  public removeToken(): void {
    localStorage.removeItem(this.tokenReference);
  }

  private static setToken(token): void {
    localStorage.setItem('userTokens', JSON.stringify(token));
  }
}
