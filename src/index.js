import 'bootstrap'
import Popper from 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css'

import { renderLogBtn } from './mod/login.js';
import { renderContentTbl } from './mod/content.js';
import { renderInviteRegistrationForm } from './mod/invite.js';

renderContentTbl()
renderLogBtn()
renderInviteRegistrationForm()